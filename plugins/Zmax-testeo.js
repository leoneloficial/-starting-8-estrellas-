import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    m.react('🎵');
    throw '🎵 Por favor ingresa la música que deseas descargar.';
  }

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「✦」ძᥱsᥴᥲrgᥲᥒძ᥆ *<${videoInfo.title}>*\n\n> ✦ ᥴᥲᥒᥲᥣ » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ ᥎іs𝗍ᥲs » *${videoInfo.views}*\n> ⴵ ძᥙrᥲᥴі᥆ᥒ » *${videoInfo.timestamp}*\n> ✐ ⍴ᥙᑲᥣіᥴᥲძ᥆ » *${videoInfo.ago}*\n> 🜸 ᥣіᥒk » ${videoInfo.url}\n`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      buttons: [
        {
          buttonId: `.ytmp3 ${videoInfo.url}`,
          buttonText: { displayText: 'ᰔᩚ ᥲᥙძі᥆ ⃪⃘⵿᷒〬ᰰુ͡ꪆֺּ ' },
        },
        {
          buttonId: `.ytmp4 ${videoInfo.url}`,
          buttonText: { displayText: 'ᰔᩚ ᥎іძᥱ᥆ ⃪⃘⵿᷒〬ᰰુ͡ꪆֺּ ' },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    m.react('🎵'); // Reacción de música

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('⏳'); // Indica que está procesando
    let audio = await (await fetch(`https://api.example.com/ytmp3?url=${videoInfo.url}`)).json();
    
    await conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('✅'); // Indica que terminó correctamente

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('⏳');
    let video = await (await fetch(`https://api.example.com/ytmp4?url=${videoInfo.url}`)).json();

    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: '',
    }, { quoted: m });

    m.react('✅');

  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;