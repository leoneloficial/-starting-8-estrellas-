import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "⚠️ Debes escribir el nombre de la música.";

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "❌ No se encontraron resultados.";
  }

  const videoInfo = search.all[0];
  const body = `🎵 *${videoInfo.title}*\n\n📺 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n👀 *Vistas:* ${videoInfo.views}\n⏳ *Duración:* ${videoInfo.timestamp}\n📆 *Publicado:* ${videoInfo.ago}\n🔗 *Enlace:* ${videoInfo.url}`;

  if (command === 'play' || command === 'playvid' || command === 'play2') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "🔊 Selecciona una opción:",
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎶 Descargar MP3' }, type: 1 },
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📹 Descargar MP4' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('⏳');
    let audio = await (await fetch(`API_YTMP3?url=${videoInfo.url}`)).json();

    await conn.sendMessage(m.chat, { 
      document: { url: audio.data.url }, 
      mimetype: "audio/mpeg", 
      fileName: `${videoInfo.title}.mp3` 
    }, { quoted: m });

    m.react('✅');

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('⏳');
    let video = await (await fetch(`API_YTMP4?url=${videoInfo.url}`)).json();

    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: "🎥 Video descargado con éxito"
    }, { quoted: m });

    m.react('✅');
  } else {
    throw "⚠️ Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;