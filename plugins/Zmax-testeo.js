import fetch from "node-fetch"; import yts from "yt-search";

const encodedApi = "aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDM="; const getApiUrl = () => Buffer.from(encodedApi, "base64").toString("utf-8");

const fetchWithRetries = async (url, maxRetries = 2) => { for (let attempt = 0; attempt <= maxRetries; attempt++) { try { console.log(Intento ${attempt + 1}: ${url}); const response = await fetch(url); const data = await response.json(); if (data?.status === 200 && data.result?.download?.url) { return data.result; } } catch (error) { console.error(Intento ${attempt + 1} fallido:, error.message); } } throw new Error("No se pudo obtener la música después de varios intentos."); };

let handler = async (m, { conn, text }) => { if (!text || !text.trim()) { return conn.sendMessage(m.chat, { text: "❗ Ingresa un término de búsqueda para encontrar música.\n\nEjemplo: .play No llores más" }); }

try { await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

const searchResults = await yts(text.trim());
console.log("Resultados de búsqueda:", searchResults);
const video = searchResults.videos[0];
if (!video) throw new Error("No se encontraron resultados.");

const apiUrl = `${getApiUrl()}?url=${encodeURIComponent(video.url)}`;
console.log("API URL:", apiUrl);
const apiData = await fetchWithRetries(apiUrl);

const infoMessage = `「✦」Descargando *<${video.title}>*\n\n` +
  `> ✦ Canal » *${video.author.name || 'Desconocido'}*\n` +
  `> ✰ Vistas » *${video.views}*\n` +
  `> ⴵ Duración » *${video.timestamp}*\n` +
  `> ✐ Publicación » *${video.ago}*\n` +
  `> 🜸 Link » ${video.url}\n`;

await conn.sendMessage(m.chat, { text: infoMessage });

const audioMessage = {
  audio: { url: apiData.download.url },
  mimetype: "audio/mpeg",
  fileName: `${video.title}.mp3`,
};

await conn.sendMessage(m.chat, audioMessage, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

} catch (error) { console.error("Error completo:", error); await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } }); await conn.sendMessage(m.chat, { text: ❌ *Error al procesar tu solicitud:*\n${error.message || "Error desconocido"} }); } };

handler.command = /^play$/i; export default handler;

