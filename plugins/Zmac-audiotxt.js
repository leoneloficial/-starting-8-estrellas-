const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.audio) return m.reply(`Responde a un audio con *${usedPrefix + command}*`);

  let audioPath = path.join(__dirname, "input.mp3");
  let instrumentalPath = path.join(__dirname, "output/instrumental.wav");

  let audioBuffer = await m.quoted.download();
  fs.writeFileSync(audioPath, audioBuffer);

  m.reply("Verificando dependencias...");

  // Instalar Spleeter si no está instalado
  exec("spleeter -h", (error) => {
    if (error) {
      m.reply("Spleeter no encontrado. Instalando dependencias...");
      exec("pkg install python ffmpeg -y && pip install spleeter", (err, stdout, stderr) => {
        if (err) return m.reply("Error instalando dependencias.");
        separarAudio(m, conn, audioPath, instrumentalPath);
      });
    } else {
      separarAudio(m, conn, audioPath, instrumentalPath);
    }
  });
};

function separarAudio(m, conn, audioPath, instrumentalPath) {
  m.reply("Procesando audio, espera un momento...");

  exec(`spleeter separate -p spleeter:2stems -o output ${audioPath}`, (err, stdout, stderr) => {
    if (err) return m.reply("Error al procesar el audio");

    let instrumentalBuffer = fs.readFileSync(instrumentalPath);
    conn.sendMessage(m.chat, { audio: instrumentalBuffer, mimetype: "audio/mp3" }, { quoted: m });

    fs.unlinkSync(audioPath); // Eliminar archivos temporales
  });
}

handler.command = ["instrumental"];
handler.tags = ["audio"];
handler.help = ["instrumental"];

module.exports = handler;