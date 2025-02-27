import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text) {
    m.react('⚠️');
    return await m.reply('🎵 Por favor ingresa la música que deseas descargar.');
  }

  m.react('🎵'); // Reacción inmediata

  try {
    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return await m.reply("No se encontraron resultados para tu búsqueda.");
    }

    const videoInfo = search.all[0];
    const body = `「✦」Descargando *<${videoInfo.title}>*\n\n> 🎤 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n> 👁 *Vistas:* ${videoInfo.views}\n> ⏳ *Duración:* ${videoInfo.timestamp}\n> 📅 *Publicado:* ${videoInfo.ago}\n> 🔗 *Link:* ${videoInfo.url}`;

    if (command === 'play' || command === 'play2' || command === 'playvid') {
      await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: body,
        buttons: [
          { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎶 Audio' } },
          { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '🎥 Video' } },
        ],
        viewOnce: true,
      }, { quoted: m });

    } else if (command === 'yta' || command === 'ytmp3') {
      m.react('⏳');
      const apiUrl = `https://api.akuari.my.id/down/ytmp3?link=${videoInfo.url}`;
      const response = await fetch(apiUrl);
      const audio = await response.json();

      if (!audio || !audio.result || !audio.result.url) {
        return await m.reply('⚠️ Error al obtener el audio. Intenta con otro video.');
      }

      await conn.sendFile(m.chat, audio.result.url, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
      m.react('✅');

    } else if (command === 'ytv' || command === 'ytmp4') {
      m.react('⏳');
      const apiUrl = `https://api.akuari.my.id/down/ytmp4?link=${videoInfo.url}`;
      const response = await fetch(apiUrl);
      const video = await response.json();

      if (!video || !video.result || !video.result.url) {
        return await m.reply('⚠️ Error al obtener el video. Intenta con otro video.');
      }

      await conn.sendMessage(m.chat, {
        video: { url: video.result.url },
        mimetype: "video/mp4",
        caption: videoInfo.title,
      }, { quoted: m });

      m.react('✅');

    } else {
      return await m.reply("Comando no reconocido.");
    }

  } catch (error) {
    console.error(error);
    return await m.reply("⚠️ Ocurrió un error. Intenta nuevamente más tarde.");
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;