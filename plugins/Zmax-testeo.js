import fetch from "node-fetch";
import yts from "yt-search";

// API en formato Base64
const encodedApi = "aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDM=";

// Función para decodificar la URL de la API
const getApiUrl = () => Buffer.from(encodedApi, "base64").toString("utf-8");

// Función para obtener datos de la API con reintentos
const fetchWithRetries = async (url, maxRetries = 2) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.status === 200 && data.result?.download?.url) {
        return data.result;
      }
    } catch (error) {
      console.error(`Intento ${attempt + 1} fallido:`, error.message);
    }
  }
  throw new Error("No se pudo obtener la música después de varios intentos.");
};

// Handler principal
let handler = async (m, { conn, text }) => {
  // Validar si el comando es válido para evitar conflictos con "comando no existe"
  const command = m.text?.slice(global.prefix.exec(m.text)?.[0]?.length || 0).trim().split(' ')[0].toLowerCase();
  const isValidCommand = (cmd) => {
    for (let plugin of Object.values(global.plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)) {
        return true;
      }
    }
    return false;
  };
  if (!isValidCommand(command)) return;

  if (!text || !text.trim()) {
    return conn.sendMessage(m.chat, {
      text: "❗ *Ingresa un término de búsqueda para encontrar música.*\n\n*Ejemplo:* `.play No llores más`",
    });
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    const searchResults = await yts(text.trim());
    const video = searchResults.videos[0];
    if (!video) throw new Error("No se encontraron resultados.");

    const apiUrl = `${getApiUrl()}?url=${encodeURIComponent(video.url)}`;
    const apiData = await fetchWithRetries(apiUrl);

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: `🎵 *Título:* ${video.title}\n👁️ *Vistas:* ${video.views}\n⏳ *Duración:* ${video.timestamp}\n✍️ *Autor:* ${video.author.name}`,
    });

    const audioMessage = {
      audio: { url: apiData.download.url },
      mimetype: "audio/mpeg",
      fileName: `${video.title}.mp3`,
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    await conn.sendMessage(m.chat, {
      text: `❌ *Error al procesar tu solicitud:*\n${error.message || "Error desconocido"}`,
    });
  }
};

handler.command = /^play$/i;

export default handler;