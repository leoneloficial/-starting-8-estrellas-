import { exec } from "child_process";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.audio) {
    return m.reply(`⚠️ Responde a un audio con *${usedPrefix + command}* para separar la voz.`);
  }

  let audioPath = path.join("input.mp3");
  let outputDir = path.join("output");
  let instrumentalPath = path.join(outputDir, "input/accompaniment.wav");

  let audioBuffer = await m.quoted.download();
  fs.writeFileSync(audioPath, audioBuffer);

  m.reply("🎵 Procesando el audio... Esto puede tardar unos segundos.");

  exec("spleeter -h", (error) => {
    if (error) {
      m.reply("⚠️ Instalando dependencias necesarias...");

      exec("pkg install python ffmpeg -y && pip install spleeter", (err) => {
        if (err) {
          console.error("❌ Error instalando Spleeter:", err);
          return m.reply("❌ No se pudo instalar Spleeter.");
        }
        separarAudio(m, conn, audioPath, instrumentalPath);
      });
    } else {
      separarAudio(m, conn, audioPath, instrumentalPath);
    }
  });
};

function separarAudio(m, conn, audioPath, instrumentalPath) {
  exec(`spleeter separate -p spleeter:2stems -o output ${audioPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Error al procesar el audio:", err);
      return m.reply("❌ No se pudo procesar el audio.");
    }

    if (!fs.existsSync(instrumentalPath)) {
      console.error("❌ No se generó el archivo instrumental.");
      return m.reply("❌ No se pudo extraer la instrumental.");
    }

    let instrumentalBuffer = fs.readFileSync(instrumentalPath);
    conn.sendMessage(m.chat, { audio: instrumentalBuffer, mimetype: "audio/mp3" }, { quoted: m });

    fs.unlinkSync(audioPath);
    fs.unlinkSync(instrumentalPath);
  });
}

handler.command = ["instrumental"];
handler.tags = ["audio"];
handler.help = ["instrumental"];

export default handler;