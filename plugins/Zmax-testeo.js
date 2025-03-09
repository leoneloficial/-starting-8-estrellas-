import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "⚠️ Por favor ingresa la música que deseas descargar.";

  console.log("Texto recibido:", text); // Depuración
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "❌ No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  console.log("URL obtenida:", videoInfo?.url); // Depuración

  if (!videoInfo.url || !/^https?:\/\//.test(videoInfo.url)) {
    throw "❌ No se pudo obtener una URL válida para la descarga.";
  }

  const body = `🎵 Descargando *<${videoInfo.title}>*\n\n📺 Canal: *${videoInfo.author.name || 'Desconocido'}*\n👁️‍🗨️ Vistas: *${videoInfo.views}*\n⏳ Duración: *${videoInfo.timestamp}*\n🗓️ Publicado: *${videoInfo.ago}*\n🔗 Link: ${videoInfo.url}`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎧 Audio' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎥 Video' } },
      ],
      headerType: 4,
    }, { quoted: m });
    m.react('🎶');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('⏳');
    let audio;
    try {
      audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
    } catch (error) {
      console.error("Error en API 1:", error);
      try {
        audio = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
      } catch (error) {
        console.error("Error en API 2:", error);
        audio = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`)).json();
      }
    }

    if (!audio.data || !audio.data.url) throw "❌ No se pudo obtener el audio.";
    conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('✅');

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('⏳');
    let video;
    try {
      video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
    } catch (error) {
      console.error("Error en API 1:", error);
      try {
        video = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
      } catch (error) {
        console.error("Error en API 2:", error);
        video = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`)).json();
      }
    }

    if (!video.data || !video.data.url) throw "❌ No se pudo obtener el video.";
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
    }, { quoted: m });
    m.react('✅');

  } else {
    throw "❌ Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'yta', 'play2'];
handler.command = ['play', 'playvid', 'ytv', 'yta', 'play2'];
handler.tags = ['dl'];
handler.register = true;

export default handler;