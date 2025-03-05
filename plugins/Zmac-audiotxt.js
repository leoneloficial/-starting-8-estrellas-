import { exec } from "child_process";
import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";

const handler = async (m, { conn, usedPrefix, command, args }) => {
  let audioPath = path.join("input.mp3");
  let outputDir = path.join("output");
  let instrumentalPath = path.join(outputDir, "input/accompaniment.wav");

  if (args[0] && ytdl.validateURL(args[0])) {
    // Descargar desde YouTube
    m.reply("📥 Descargando audio desde YouTube...");
    try {
      const stream = ytdl(args[0], { filter: "audioonly", quality: "highestaudio" });
      const writeStream = fs.createWriteStream(audioPath);
      stream.pipe(writeStream);
      writeStream.on("finish", () => {
        procesarAudio(m, conn, audioPath, instrumentalPath);
      });
    } catch (error) {
      console.error("❌ Error descargando de YouTube:", error);
      return m.reply("❌ No se pudo descargar el audio desde YouTube.");
    }
  } else if (m.quoted?.audio) {
    // Descargar el audio del mensaje
    m.reply("🎵 Procesando el audio... Esto puede tardar unos segundos.");
    let audioBuffer = await m.quoted.download();
    fs.writeFileSync(audioPath, audioBuffer);
    procesarAudio(m, conn, audioPath, instrumentalPath);
  } else {
    return m.reply(`⚠️ Responde a un audio o proporciona un enlace de YouTube con *${usedPrefix + command}*`);
  }
};

function procesarAudio(m, conn, audioPath, instrumentalPath) {
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
}

function separarAudio(m, conn, audioPath, instrumentalPath) {
  exec(`spleeter separate -p spleeter:2stems -o output ${audioPath}`, (err) => {
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