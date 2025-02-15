import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '2160'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato no soportado. Verifica la lista de formatos disponibles.');
    }

    const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

    try {
      const { data } = await axios.get(apiUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      if (data?.success) {
        const { id, title, info } = data;
        const downloadUrl = await ddownr.cekProgress(id);

        return { id, title, image: info.image, downloadUrl };
      } else {
        throw new Error('Fallo al obtener detalles del video.');
      }
    } catch (error) {
      console.error('Error en descarga:', error);
      throw new Error('Error en la descarga. Inténtalo de nuevo más tarde.');
    }
  },

  cekProgress: async (id) => {
    const apiUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
    let attempts = 0, maxAttempts = 20;

    while (attempts < maxAttempts) {
      try {
        const { data } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });

        if (data?.success && data.progress === 1000) {
          return data.download_url;
        }
      } catch (error) {
        console.error('Error al verificar progreso:', error);
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error('Tiempo de espera agotado para la descarga.');
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) {
      return await conn.reply(m.chat, '⚠️ Ingresa el nombre de la música a descargar.', m);
    }

    const search = await yts(text);
    if (!search.all?.length) {
      return await conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = formatViews(views);
    
    const infoMessage = `🎬 *${title}*\n⏳ *Duración:* ${timestamp}\n👀 *Vistas:* ${vistas}\n📌 *Canal:* ${author?.name || 'Desconocido'}\n📆 *Publicado:* ${ago}\n🔗 *Enlace:* ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    await conn.reply(m.chat, infoMessage, m, {
      contextInfo: {
        externalAdReply: {
          title: "Descargador de YouTube",
          body: "by tu_bot",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    });

    if (['play', 'yta', 'ytmp3'].includes(command)) {
      const { downloadUrl } = await ddownr.download(url, 'mp3');
      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m });

    } else if (['play2', 'ytv', 'ytmp4'].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (const source of sources) {
        try {
          const res = await fetch(source);
          const json = await res.json();
          const downloadUrl = json?.data?.dl || json?.result?.download?.url || json?.downloads?.url || json?.data?.download?.url;

          if (downloadUrl) {
            success = true;
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: 'video/mp4',
              caption: '🎥 Aquí tienes tu video.',
              thumbnail: thumb
            }, { quoted: m });
            break;
          }
        } catch (err) {
          console.error(`Error con la fuente ${source}:`, err.message);
        }
      }

      if (!success) {
        return await conn.reply(m.chat, '❌ No se pudo descargar el video.', m);
      }
    } else {
      throw new Error("Comando no reconocido.");
    }
  } catch (error) {
    await conn.reply(m.chat, `⚠️ Error: ${error.message}`, m);
  }
};

handler.command = ['play', 'play2', 'ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;

function formatViews(views) {
  return views >= 1000 ? `${(views / 1000).toFixed(1)}k (${views.toLocaleString()})` : views.toString();
}