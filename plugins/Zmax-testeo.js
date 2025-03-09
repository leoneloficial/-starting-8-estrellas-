import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "❌ *Por favor ingresa el nombre de la música que deseas descargar.*";

  const search = await yts(text);
  if (!search.all || search.all.length === 0) {
    throw "⚠️ *No se encontraron resultados para tu búsqueda.*";
  }

  const videoInfo = search.all[0];
  const body = `🎵 *Descarga de Música* 🎵\n\n📌 *Título:* ${videoInfo.title}\n📺 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n👁 *Vistas:* ${videoInfo.views.toLocaleString()}\n⏳ *Duración:* ${videoInfo.timestamp}\n📆 *Publicado hace:* ${videoInfo.ago}\n🔗 *Enlace:* ${videoInfo.url}`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "📥 *Selecciona una opción:*",
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎧 Descargar MP3' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎬 Descargar MP4' } },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
    m.react('⏳');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('⏳');
    let audio;
    try {
      console.log(`[INFO] Intentando descargar audio de ${videoInfo.url}`);
      audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
      console.log("[INFO] Respuesta de la API 1:", audio);
    } catch (error) {
      console.error("[ERROR] Falló la API 1:", error);
      try {
        audio = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
        console.log("[INFO] Respuesta de la API 2:", audio);
      } catch (error) {
        console.error("[ERROR] Falló la API 2:", error);
        try {
          audio = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`)).json();
          console.log("[INFO] Respuesta de la API 3:", audio);
        } catch (error) {
          console.error("[ERROR] Falló la API 3:", error);
        }
      }
    }
    
    if (!audio || !audio.data || !audio.data.url) {
      throw "❌ *No se pudo obtener el audio. Inténtalo más tarde.*";
    }

    console.log("[INFO] Enviando audio...");
    await conn.sendFile(m.chat, audio.data.url, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('✅');

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('⏳');
    let video;
    try {
      console.log(`[INFO] Intentando descargar video de ${videoInfo.url}`);
      video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
      console.log("[INFO] Respuesta de la API 1:", video);
    } catch (error) {
      console.error("[ERROR] Falló la API 1:", error);
      try {
        video = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
        console.log("[INFO] Respuesta de la API 2:", video);
      } catch (error) {
        console.error("[ERROR] Falló la API 2:", error);
        try {
          video = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`)).json();
          console.log("[INFO] Respuesta de la API 3:", video);
        } catch (error) {
          console.error("[ERROR] Falló la API 3:", error);
        }
      }
    }
    
    if (!video || !video.data || !video.data.url) {
      throw "❌ *No se pudo obtener el video. Inténtalo más tarde.*";
    }

    console.log("[INFO] Enviando video...");
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: "🎬 *Aquí está tu video:*",
    }, { quoted: m });
    m.react('✅');

  } else {
    throw "❌ *Comando no reconocido.*";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;