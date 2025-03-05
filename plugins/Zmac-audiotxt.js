import { exec } from "child_process";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, usedPrefix, command, args }) => {
  let audioPath = path.join("input.mp3");
  let outputDir = path.join("output");
  let instrumentalPath = path.join(outputDir, "input/accompaniment.wav");

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  if (args.length > 0 && youtubeRegex.test(args[0])) {
    m.reply("📥 Descargando audio desde YouTube...");
    descargarAudio(m, conn, args[0], audioPath, instrumentalPath);
  } else if (m.quoted?.mimetype?.startsWith("audio/")) {
    m.reply("🎵 Procesando el audio... Esto puede tardar unos segundos.");
    let audioBuffer = await m.quoted.download();
    fs.writeFileSync(audioPath, audioBuffer);
    procesarAudio(m, conn, audioPath, instrumentalPath);
  } else {
    return m.reply(`⚠️ Responde a un audio o proporciona un enlace de YouTube con *${usedPrefix + command} <URL>*`);
  }
};

function instalarDependencias(m, callback) {
  m.reply("⚠️ Instalando dependencias necesarias...");
  exec("pkg install python ffmpeg -y && pip install spleeter yt-dlp", (err) => {
    if (err) {
      console.error("❌ Error instalando dependencias:", err);
      return m.reply("❌ No se pudo instalar alguna dependencia.");
    }
    callback();
  });
}

function descargarAudio(m, conn, url, audioPath, instrumentalPath) {
  exec("yt-dlp --version", (error) => {
    if (error) {
      instalarDependencias(m, () => descargarAudio(m, conn, url, audioPath, instrumentalPath));
    } else {
      exec(`yt-dlp -x --audio-format mp3 -o "${audioPath}" ${url}`, (err) => {
        if (err) {
          console.error("❌ Error descargando de YouTube:", err);
          return m.reply("❌ No se pudo descargar el audio desde YouTube.");
        }
        procesarAudio(m, conn, audioPath, instrumentalPath);
      });
    }
  });
}

function procesarAudio(m, conn, audioPath, instrumentalPath) {
  exec("spleeter -h", (error) => {
    if (error) {
      instalarDependencias(m, () => separarAudio(m, conn, audioPath, instrumentalPath));
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