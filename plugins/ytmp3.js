//zaphkiel


import fetch from "node-fetch";


const fetchWithRetries = async (url, maxRetries = 2) => { let attempt = 0; while (attempt <= maxRetries) { try { const response = await fetch(url); const data = await response.json();

if (data && data.status === 200 && data.result && data.result.download && data.result.download.url) {
    return data.result;
  }
} catch (error) {
  console.error(`Error en el intento ${attempt + 1}:`, error.message);
}
attempt++;

} throw new Error("No se pudo obtener una respuesta válida después de varios intentos."); };

const reconstructUrl = () => { const parts = [ "aHR0cHM6Ly9hcGkudnJlZGVu", "LndlYi5pZC9hcGkveXRtcDM=", ]; return Buffer.from(parts.join(""), "base64").toString("utf-8"); };


 let handler = async (m, { conn, text, usedPrefix }) => { if (!text || !/^https://(www.)?youtube.com/watch?v=/.test(text)) { return conn.sendMessage(m.chat, { text: ❗ *Por favor ingresa un enlace válido de YouTube para descargar la música.*\n\n📌 *Ejemplo:* ${usedPrefix}ytmp3 https://www.youtube.com/watch?v=dQw4w9WgXcQ, }); }

try { // Reconstruir la URL de la API y construir la solicitud const apiUrl = ${reconstructUrl()}?url=${encodeURIComponent(text)};

// Intentar obtener datos con reintentos
const apiData = await fetchWithRetries(apiUrl);

const { metadata, download } = apiData;
const { title, duration, views, author, url: videoUrl } = metadata;
const { url: downloadUrl } = download;

// Descripción personalizada para el archivo encontrado
const description = `⌘━─━─≪ *Starting AI* ≫─━─━⌘\n\n🎵 *Título:* ${title}\n⏳ *Duración:* ${duration.timestamp || "Desconocida"}\n👁️ *Vistas:* ${views.toLocaleString() || "Desconocidas"}\n✍️ *Autor:* ${author.name || "Desconocido"}\n🔗 *Enlace del video:* ${videoUrl}\n\n✨ *Tu archivo se está enviando, por favor espera...*\n\n⌘━━─≪ Power By Barboza Bot AI ≫─━━⌘`;

// Enviar mensaje con la información específica del video
await conn.sendMessage(m.chat, { text: description });

// Enviar archivo como audio
await conn.sendMessage(
  m.chat,
  {
    audio: { url: downloadUrl },
    mimetype: "audio/mpeg",
    fileName: `${title}.mp3`,
    caption: `🎶 *Descarga completada por Barboza Bot AI*`,
  },
  { quoted: m }
);

} catch (error) { console.error("Error al procesar la solicitud:", error); await conn.sendMessage(m.chat, { text: ❌ *Ocurrió un error al intentar procesar tu solicitud:*\n${error.message || "Error desconocido"}, }); } };

handler.command = /^ytmp3$/i; // Comando único: ytmp3

export default handler;

