//mejorado por ENder

import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw '*Debes ingresar el nombre de la canción o artista*';

  // Mensaje inicial con animación de carga
  let searchMessage = await conn.sendMessage(m.chat, { text: ' *Buscando tu música...*\n❀ Esto puede tardar unos segundos...' }, { quoted: m });

  try {
    const isVideo = /vid|2|mp4|v$/.test(command);
    const search = await yts(text);

    if (!search.all || search.all.length === 0) {
      throw '*No se encontraron resultados para tu búsqueda*';
    }

    const videoInfo = search.all[0];
    const responseText = `┅─֟͜─͜─ٞ͜─͜─๊͜─͜─๋͜─⃔═̶፝֟͜═̶⃔─๋͜─͜─͜─๊͜─ٞ͜─͜─֟͜─͜┅
ᯓ×͜× *Música Encontrada* ×͜×ᯓ\n\n` +
      `> ✎Título: ${videoInfo.title}\n` +
      `> ⚘ *Canal:* ${videoInfo.author.name || 'Desconocido'}\n` +
      `> ❁ Duración: ${videoInfo.timestamp}\n` +
      `> ✰ Vistas: ${videoInfo.views.toLocaleString()}\n` +
      `> ✦ Publicado hace: ${videoInfo.ago}\n` +
      `> ✤ Link: ${videoInfo.url}`;

    if (['play', 'playvid', 'play2'].includes(command)) {
      await conn.sendMessage(m.chat, {
        image: { url: videoInfo.thumbnail },
        caption: responseText,
        footer: '✦ Elige una opción de descarga:',
        buttons: [
          {
            buttonId: `.ytmp3 ${videoInfo.url}`,
            buttonText: { displayText: '> 🍓 Audio mp3 ♣' },
          },
          {
            buttonId: `.ytmp4 ${videoInfo.url}`,
            buttonText: { displayText: '> 🍒 Video mp4 ♣' },
          },
        ],
        viewOnce: true,
        headerType: 4,
      }, { quoted: m });

    } else if (['yta', 'ytmp3'].includes(command)) {
      await conn.sendMessage(m.chat, { text: '🎧 *Procesando audio...* ' }, { quoted: m });
      let response = await fetch(`api${videoInfo.url}`);
      let audio = await response.json();
      await conn.sendFile(m.chat, audio.data.url, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg", asDocument: false });

    } else if (['ytv', 'ytmp4'].includes(command)) {
      await conn.sendMessage(m.chat, { text: '🎬 *Procesando video...* 🔄' }, { quoted: m });
      let response = await fetch(`api${videoInfo.url}`);
      let video = await response.json();
      await conn.sendMessage(m.chat, {
        video: { url: video.data.url },
        mimetype: "video/mp4",
        caption: '🎥 *Aquí tienes tu video*',
      }, { quoted: m });

    } else {
      throw '🍟 Comando no reconocido.';
    }

  } catch (error) {
    await conn.sendMessage(m.chat, { text: `*Error*: ${error.message || error}` }, { quoted: m });
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;