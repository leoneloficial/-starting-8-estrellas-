import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) throw new Error("⚠️ Ingresa el nombre de la música que deseas descargar.");

    const search = await yts(text);
    if (!search.all.length) throw new Error("❌ No se encontraron resultados.");

    const videoInfo = search.all[0];

    // Mensaje de respuesta con la información del video
    let message = `🎵 *Descarga de Música*\n\n📌 *Título:* ${videoInfo.title}\n🎬 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n👀 *Vistas:* ${videoInfo.views}\n⏳ *Duración:* ${videoInfo.timestamp}\n📆 *Publicado hace:* ${videoInfo.ago}\n🔗 *Enlace:* ${videoInfo.url}`;

    // Botones de descarga
    let buttons = [
      { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎶 Descargar MP3' } },
      { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📹 Descargar MP4' } }
    ];

    // Enviar mensaje con imagen y botones

console.log("Texto de búsqueda:", text);
const search = await yts(text);
console.log("Resultados de búsqueda:", search.all);

    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: message,
      footer: "Bot WhatsApp",
      buttons,
      headerType: 4
    }, { quoted: m });

    // Si el comando es para descargar audio
    if (command === 'yta' || command === 'ytmp3') {
      m.react('⏳');

      let response = await fetch(`API_ENDPOINT/mp3?url=${encodeURIComponent(videoInfo.url)}`);
      let audio = await response.json();
      if (!audio.data || !audio.data.url) throw new Error("⚠️ Error al procesar el audio.");

      await conn.sendFile(m.chat, audio.data.url, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg" });
      m.react('✅');
    }

    // Si el comando es para descargar video
    if (command === 'ytv' || command === 'ytmp4') {
      m.react('⏳');

      let response = await fetch(`API_ENDPOINT/mp4?url=${encodeURIComponent(videoInfo.url)}`);
      let video = await response.json();
      if (!video.data || !video.data.url) throw new Error("⚠️ Error al procesar el video.");

console.log("Texto de búsqueda:", text);
const search = await yts(text);
console.log("Resultados de búsqueda:", search.all);

      await conn.sendMessage(m.chat, {
        video: { url: video.data.url },
        mimetype: "video/mp4",
        caption: `🎥 ${videoInfo.title}`
      }, { quoted: m });

      m.react('✅');
    }

  } catch (err) {
    console.error(err); // Para depuración en consola
    m.reply(`⚠️ Error: ${err.message || "Ocurrió un error inesperado."}`);
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;