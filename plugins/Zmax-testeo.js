import fetch from "node-fetch"; import yts from "yt-search"; import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav']; const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const getApiUrl = () => Buffer.from("aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDM=", "base64").toString("utf-8");

const fetchWithRetries = async (url, maxRetries = 2) => { for (let attempt = 0; attempt <= maxRetries; attempt++) { try { const response = await fetch(url); const data = await response.json(); if (data?.status === 200 && data.result?.download?.url) { return data.result; } } catch (error) { console.error(Intento ${attempt + 1} fallido:, error.message); } } throw new Error("No se pudo obtener la música después de varios intentos."); };

const ddownr = { download: async (url, format) => { if (!formatAudio.includes(format) && !formatVideo.includes(format)) { throw new Error('Formato no soportado, verifica la lista de formatos disponibles.'); }

const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
const response = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });

if (response.data && response.data.success) {
  const { id, title, info } = response.data;
  const { image } = info;
  const downloadUrl = await ddownr.cekProgress(id);
  return { id, image, title, downloadUrl };
}
throw new Error('Fallo al obtener los detalles del video.');

}, cekProgress: async (id) => { const url = https://p.oceansaver.in/ajax/progress.php?id=${id}; while (true) { const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }); if (response.data?.success && response.data.progress === 1000) { return response.data.download_url; } await new Promise(resolve => setTimeout(resolve, 5000)); } } };

let handler = async (m, { conn, text, command }) => { if (!text.trim()) { return conn.sendMessage(m.chat, { text: "❗ Ingresa un término de búsqueda para encontrar música.\n\nEjemplo: .play No llores más" }); }

try { await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } }); const searchResults = await yts(text.trim()); const video = searchResults.videos[0]; if (!video) throw new Error("No se encontraron resultados.");

const infoMessage = `「✦」Descargando *<${video.title}>*\n\n` +
  `> ✦ Canal » *${video.author.name || 'Desconocido'}*\n` +
  `> ✰ Vistas » *${video.views}*\n` +
  `> ⴵ Duración » *${video.timestamp}*\n` +
  `> ✐ Publicación » *${video.ago}*\n` +
  `> 🜸 Link » ${video.url}\n`;

await conn.sendMessage(m.chat, { text: infoMessage });
let downloadUrl = "";

if (command === 'play' || command === 'yta' || command === 'mp3') {
  const apiData = await fetchWithRetries(`${getApiUrl()}?url=${encodeURIComponent(video.url)}`);
  downloadUrl = apiData.download.url;
} else if (command === 'play2' || command === 'ytv' || command === 'mp4') {
  const api = await ddownr.download(video.url, 'mp4');
  downloadUrl = api.downloadUrl;
}

if (!downloadUrl) throw new Error("No se pudo obtener el enlace de descarga.");

const mediaMessage = command.includes('mp4') ? {
  video: { url: downloadUrl },
  mimetype: 'video/mp4',
  fileName: `${video.title}.mp4`,
  caption: `✎﹏Aqui tienes tu video`
} : {
  audio: { url: downloadUrl },
  mimetype: "audio/mpeg",
  fileName: `${video.title}.mp3`
};

await conn.sendMessage(m.chat, mediaMessage, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

} catch (error) { console.error("Error:", error); await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } }); await conn.sendMessage(m.chat, { text: ❌ *Error al procesar tu solicitud:*\n${error.message || "Error desconocido"} }); } };

handler.command = ['play', 'play2', 'mp3', 'yta', 'mp4', 'ytv']; export default handler;

