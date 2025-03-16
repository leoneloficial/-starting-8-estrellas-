import fetch from "node-fetch";

// Decodificar Base64
const decodeBase64 = (encoded) => Buffer.from(encoded, "base64").toString("utf-8");

// Manejo de solicitudes con reintentos
const fetchWithRetries = async (url, maxRetries = 2) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.status === 200 && data?.data?.download?.url) return data.data;
    } catch (error) {
      console.error(`Error en el intento ${attempt + 1}:`, error.message);
    }
  }
  throw new Error("No se pudo obtener una respuesta válida después de varios intentos.");
};

// Handler principal
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(text)) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ *¡Enlace inválido!*\n\n🔗 *Por favor, ingresa un enlace válido de YouTube para descargar el video.*\n\n📌 *Ejemplo:* ${usedPrefix}ytmp4 https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    });
  }

  try {
    // Mensaje inicial
    const initialMessage = `
╭━━━📡 **August-Ai** 📡━━━╮
🔍 *Procesando tu solicitud...*
💾 *Descargando el video...*
⏳ *Esto puede tardar unos momentos.*
╰━━━━━━━━━━━━━━━━━━━━━━╯
    `;
    const key = await conn.sendMessage(m.chat, { text: initialMessage });

    // URL de la API
    const encodedApiUrl = "aHR0cHM6Ly9yZXN0YXBpLmFwaWJvdHdhLmJpei5pZC9hcGkveXRtcDQ=";
    const apiUrl = `${decodeBase64(encodedApiUrl)}?url=${encodeURIComponent(text)}`;
    const apiData = await fetchWithRetries(apiUrl);

    // Datos del video
    const { metadata, download } = apiData;
    const { title, duration, thumbnail, description } = metadata;
    const { url: downloadUrl, quality, filename } = download;

    // Calcular el tamaño del archivo
    const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
    const fileSize = parseInt(fileResponse.headers.get("content-length") || 0);
    const fileSizeInMB = fileSize / (1024 * 1024);

    // Formato del mensaje con información del video
    const videoInfo = `
📥 **Video Encontrado**  
━━━━━━━━━━━━━━━━━━━━━  
🎵 *Título:* ${title}  
⏱️ *Duración:* ${duration.timestamp || "No disponible"}  
📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB  
📽️ *Calidad:* ${quality || "No disponible"}  

📌 **Descripción:**  
${description || "Sin descripción disponible"}  
━━━━━━━━━━━━━━━━━━━━━  
📤 *Preparando para enviar...*
    `;
    await conn.sendMessage(m.chat, { text: videoInfo, edit: key });

    // Enviar como documento si es mayor a 70 MB, de lo contrario como video reproducible
    if (fileSizeInMB > 70) {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: filename || `${title}.mp4`,
          caption: `📂 *Video enviado en formato documento:*\n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: filename || `${title}.mp4`,
          caption: `🎥 *Video reproducible:*\n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    await conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error:*\n${error.message || "Error desconocido"}`,
    });
  }
};

handler.command = /^ytmp4$/i;
export default handler;