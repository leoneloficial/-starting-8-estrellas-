import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, "⚠️ Ingresa el nombre de la canción.", m);
  }

  console.log(`[INFO] Buscando en YouTube: ${text}`);
  
  try {
    const search = await yts(text);
    if (!search.videos.length) {
      return conn.reply(m.chat, "❌ No se encontraron resultados.", m);
    }

    const videoInfo = search.videos[0]; // Toma el primer resultado válido
    const { title, author, views, timestamp, ago, url, thumbnail } = videoInfo;

    const messageText = `🎵 *${title}*\n\n` +
      `📺 *Canal:* ${author.name || 'Desconocido'}\n` +
      `👀 *Vistas:* ${views.toLocaleString()}\n` +
      `⏳ *Duración:* ${timestamp}\n` +
      `📅 *Publicado:* ${ago}\n` +
      `🔗 *Link:* ${url}`;

    console.log(`[INFO] Video encontrado: ${url}`);

    if (['play', 'playvid', 'play2'].includes(command)) {
      let msg = await conn.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: messageText,
        footer: "🎧 Descarga rápida",
        buttons: [
          { buttonId: `.yta ${url}`, buttonText: { displayText: '🎵 Audio' } },
          { buttonId: `.ytv ${url}`, buttonText: { displayText: '🎥 Video' } },
        ],
        viewOnce: true,
        headerType: 4,
      }, { quoted: m });

      global.play = global.play || {};
      global.play[msg.key.id] = { url };
      return;
    }

    // Función para obtener URL de descarga de distintas APIs
    const fetchFromAPIs = async (videoUrl, type) => {
      const apis = [
        `https://api.alyachan.dev/api/youtube?url=${videoUrl}&type=${type}&apikey=Gata-Dios`,
        `https://delirius-apiofc.vercel.app/download/yt${type}?url=${videoUrl}`,
        `https://api.vreden.my.id/api/yt${type}?url=${videoUrl}`
      ];

      for (let api of apis) {
        try {
          console.log(`[INFO] Intentando API: ${api}`);
          let res = await fetch(api);
          let json = await res.json();
          
          if (json?.data?.url) {
            console.log(`[INFO] Descarga lista: ${json.data.url}`);
            return json.data.url;
          }
        } catch (e) {
          console.log(`[ERROR] Falló API: ${api} - ${e.message}`);
        }
      }
      throw "⚠️ No se pudo obtener el archivo.";
    };

    // Manejo de comandos para descargar
    if (command === 'yta' || command === 'ytmp3') {
      let audioUrl = await fetchFromAPIs(url, "mp3");
      return await conn.sendFile(m.chat, audioUrl, `${title}.mp3`, '', m, null, { mimetype: "audio/mpeg" });
    }

    if (command === 'ytv' || command === 'ytmp4') {
      let videoUrl = await fetchFromAPIs(url, "mp4");
      return await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: "video/mp4", caption: "" }, { quoted: m });
    }
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    return conn.reply(m.chat, "❌ Ocurrió un error, intenta de nuevo.", m);
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.group = true;
handler.register = true;

export default handler;