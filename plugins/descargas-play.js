import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '2160'];

// Función para obtener el enlace de descarga utilizando la API de Apowersoft
const getDownloadLink = async (url, format) => {
  try {
    const apiUrl = `https://www.apowersoft.es/api/video-downloader?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const { data } = response;

    if (data && data.download_url) {
      return data.download_url;
    } else {
      throw new Error('No se pudo obtener el enlace de descarga.');
    }
  } catch (error) {
    console.error('Error al obtener el enlace de descarga:', error);
    throw new Error('Error en la descarga. Inténtalo de nuevo más tarde.');
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
      const downloadUrl = await getDownloadLink(url, 'mp3');
      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m });

    } else if (['play2', 'ytv', 'ytmp4'].includes(command)) {
      const downloadUrl = await getDownloadLink(url, 'mp4');
      await conn.sendMessage(m.chat, {
        video: { url: downloadUrl },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: '🎥 Aquí tienes tu video.',
        thumbnail: thumb
      }, { quoted: m });
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