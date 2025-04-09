import fetch from "node-fetch";
import yts from "yt-search";

const encodedApiUrl = "aHR0cHM6Ly9hcGkuYWdhdHoueHl6L2FwaS95dG1wNA==";
const officialBrand = "©Prohibido La Copia, Código Oficial De MediaHub™"; 

const verifyBrand = () => {
    if (officialBrand !== officialBrand) {
        throw new Error("❌ *ERROR CRÍTICO:* La marca oficial de MediaHub ha sido alterada. Restáurela para continuar usando el código.");
    }
};

const fetchWithRetries = async (url, maxRetries = 2, timeout = 60000) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            const response = await fetch(url, { signal: controller.signal });
            const data = await response.json();
            clearTimeout(timeoutId);

            if (data?.status === 200 && data.data?.downloadUrl) {
                return data.data;
            }
        } catch (error) {
            if (error.name === "AbortError") continue;
        }
    }
    throw new Error("No se pudo obtener una respuesta válida después de varios intentos.");
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        verifyBrand();
        await m.react('🌸');

        if (!text) {
            const example = command === "ytmp4" ? `${usedPrefix}${command} https://youtu.be/URL_DEL_VIDEO` : `${usedPrefix}${command} Never Gonna Give You Up`;
            return conn.sendMessage(m.chat, { text: `⚠️ *¡Atención!*\n\n💡 *Por favor ingresa ${command === "play2" ? "un término de búsqueda" : "una URL válida de YouTube"}.*\n\n📌 *Ejemplo:* ${example}` });
        }

        if (command === "ytmp4" || command === "ytv") {
            if (!/^https?:\/\/(www\.)?youtube\.com\/watch\?v=|youtu\.be\//.test(text)) {
                return conn.sendMessage(m.chat, { text: `❌ *La URL ingresada no es válida.*\n\n📌 *Ejemplo válido:* ${usedPrefix}${command} https://youtu.be/URL_DEL_VIDEO` });
            }

            const apiUrl = `${Buffer.from(encodedApiUrl, "base64").toString("utf-8")}?url=${encodeURIComponent(text)}`;
            const apiData = await fetchWithRetries(apiUrl, 2, 60000);
            const { title: apiTitle, downloadUrl, image: apiImage } = apiData;

            const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
            const fileSize = parseInt(fileResponse.headers.get("content-length") || 0);
            const fileSizeInMB = fileSize / (1024 * 1024);

            await conn.sendMessage(m.chat, { image: { url: apiImage }, caption: `🎥 *Video Encontrado:* ${apiTitle}` });
            await m.react('✅');

            if (fileSizeInMB > 70) {
                await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: apiTitle || "video.mp4", caption: `📂 *Descarga en formato documento:*\n🎵 *Título:* ${apiTitle}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB` }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { quoted: m });
            }
            return;
        }

        const searchResults = await yts(text);
        const video = searchResults.videos[0];

        if (!video) {
            await m.react('❌');
            return conn.sendMessage(m.chat, { text: `❌ *No se encontraron resultados para:* ${text}` });
        }

        const { title, url: videoUrl, timestamp, views, author, image, ago } = video;
        const apiUrl = `${Buffer.from(encodedApiUrl, "base64").toString("utf-8")}?url=${encodeURIComponent(videoUrl)}`;
        const apiData = await fetchWithRetries(apiUrl, 2, 60000);
        const { title: apiTitle, downloadUrl, image: apiImage } = apiData;

        const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
        const fileSize = parseInt(fileResponse.headers.get("content-length") || 0);
        const fileSizeInMB = fileSize / (1024 * 1024);

        const videoInfo = ` *「✦」 *${apiTitle}*

> ✐ Publicación » *${ago}*
> ⴵ Duración » *${timestamp}*
> ✰ Vistas »  *${(views / 1000).toFixed(1)}k (${views.toLocaleString()})*
> 🜸 Link » *${videoUrl}*`;

        await conn.sendMessage(m.chat, { image: { url: apiImage }, caption: videoInfo });
        await m.react('🌸');

        if (fileSizeInMB > 70) {
            await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: apiTitle || `${title}.mp4`, caption: `📂 *Video en Formato Documento:* \n🎵 *Título:* ${apiTitle}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB` }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat,m });
            await m.react('✅');
        }
    } catch (error) {
        console.error("Error:", error);
        await conn.sendMessage(m.chat, { text: `❌ *Error crítico detectado:*\n${error.message || "Error desconocido."}` });
        await m.react('✖️');
    }
};

handler.command = ['play2']; // Puedes usar ['play', 'tocar'] si quieres más alias
handler.help = ['play2 <texto>'];
handler.tags = ['downloader'];


export default handler;
