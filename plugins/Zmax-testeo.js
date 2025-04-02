import fetch from "node-fetch"; import yts from 'yt-search'; import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav']; const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = { download: async (url, format) => { if (!formatAudio.includes(format) && !formatVideo.includes(format)) { throw new Error('Formato no soportado.'); }

try {
  const response = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });
  
  if (response.data?.success) {
    const { id, title, info } = response.data;
    return {
      id,
      image: info.image,
      title,
      downloadUrl: await ddownr.cekProgress(id)
    };
  } else {
    throw new Error('Fallo al obtener detalles del video.');
  }
} catch (error) {
  console.error('Error en la descarga:', error);
  throw error;
}

},

cekProgress: async (id) => { try { while (true) { const response = await axios.get(https://p.oceansaver.in/ajax/progress.php?id=${id}); if (response.data?.success && response.data.progress === 1000) { return response.data.download_url; } await new Promise(resolve => setTimeout(resolve, 5000)); } } catch (error) { console.error('Error en progreso de descarga:', error); throw error; } } };

const handler = async (m, { conn, text, command }) => { try { if (!text.trim()) { return conn.reply(m.chat, ✎ Ingresa el nombre de la música a descargar., m); }

const search = await yts(text);
if (!search.all.length) {
  return m.reply('No se encontraron resultados.');
}

const videoInfo = search.all[0];
const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
const vistas = formatViews(views);

const infoMessage = `「✦」Descargando *<${title}>*\n\n` +
  `> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n` +
  `> ✰ Vistas » *${vistas}*\n` +
  `> ⴵ Duración » *${timestamp}*\n` +
  `> ✐ Publicación » *${ago}*\n` +
  `> 🜸 Link » ${url}\n`;

await conn.reply(m.chat, infoMessage, m);

if (['play', 'yta', 'mp3'].includes(command)) {
  const api = await ddownr.download(url, 'mp3');
  await conn.sendMessage(m.chat, { audio: { url: api.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m });
} else if (['play2', 'ytv', 'mp4'].includes(command)) {
  const sources = [
    `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
    `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
    `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
    `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
  ];

  for (let source of sources) {
    try {
      const res = await fetch(source);
      const json = await res.json();
      const downloadUrl = json?.data?.dl || json?.result?.download?.url || json?.downloads?.url;

      if (downloadUrl) {
        await conn.sendMessage(m.chat, {
          video: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: '',
          thumbnail
        }, { quoted: m });
        return;
      }
    } catch (e) {
      console.error(`Error con la fuente ${source}:`, e.message);
    }
  }
  return m.reply(`✱ No se pudo descargar el video.`);
}

} catch (error) { return m.reply(𓁏 *Error:* ${error.message}); } };

handler.command = ['play', 'play2', 'mp3', 'yta', 'mp4', 'ytv']; handler.tags = ['downloader'];

export default handler;

function formatViews(views) { return views >= 1000 ? (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')' : views.toString(); }

