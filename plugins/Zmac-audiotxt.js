const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.audio) {
    return m.reply(`⚠️ Responde a un audio con *${usedPrefix + command}* para separar la voz.`);
  }

  let audioPath = path.join(__dirname, "input.mp3");
  let outputDir = path.join(__dirname, "output");
  let instrumentalPath = path.join(outputDir, "instrumental.wav");

  // Asegurar que la carpeta de salida existe
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  // Descargar el audio
  let audioBuffer = await m.quoted.download();
  fs.writeFileSync(audioPath, audioBuffer);

  m.reply("✅ Audio recibido, verificando dependencias...");

  // Verificar si Spleeter está instalado
  exec("spleeter -h", (error) => {
    if (error) {
      m.reply("⚠️ Spleeter no encontrado. Instalando dependencias, espera...");
      exec("pkg install python ffmpeg -y && pip install spleeter", (err) => {
        if (err) {
          console.error("❌ Error instalando Spleeter:", err);
          return m.reply("❌ Error instalando dependencias.");
        }
        separarAudio(m, conn, audioPath, instrumentalPath);
      });
    } else {
      separarAudio(m, conn, audioPath, instrumentalPath);
    }
  });
};

function separarAudio(m, conn, audioPath, instrumentalPath) {
  m.reply("🎵 Procesando el audio... Esto puede tardar unos segundos.");

  exec(`spleeter separate -p spleeter:2stems -o output ${audioPath}`, (err, stdout, stderr) => {
    console.log("📝 Spleeter output:", stdout);
    console.error("⚠️ Spleeter error:", stderr);

    if (err) {
      console.error("❌ Error al procesar el audio:", err);
      return m.reply("❌ Error al procesar el audio.");
    }

    if (!fs.existsSync(instrumentalPath)) {
      console.error("❌ No se generó el archivo instrumental.");
      return m.reply("❌ No se pudo extraer la instrumental.");
    }

    let instrumentalBuffer = fs.readFileSync(instrumentalPath);
    conn.sendMessage(m.chat, { audio: instrumentalBuffer, mimetype: "audio/mp3" }, { quoted: m });

    fs.unlinkSync(audioPath); // Limpiar archivos temporales
  });
}

handler.command = ["instrumental"];
handler.tags = ["audio"];
handler.help = ["instrumental"];

module.exports = handler;