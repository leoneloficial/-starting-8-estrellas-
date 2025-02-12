import axios from 'axios';

const handler = async (m, { conn, args }) => {
  try {
    const query = args[0];
    if (!query) return m.reply('🤍 *Ejemplo:* .ytmp4 <URL de YouTube>');

    // Notificar al usuario que se está obteniendo el video
    await m.reply('🔍 *Obteniendo detalles del video...*');

    // URL de la API para descargar el video
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);

    // Comprobar si los datos de respuesta contienen download_url
    if (!response.data?.result?.download_url) {
      return m.reply('🚫 *Error al obtener el video.* Verifica la URL o intenta nuevamente más tarde.');
    }

    // Extraer detalles del video
    const { title, quality, thumbnail, download_url } = response.data.result;

    // Preparar el texto para el mensaje del video
    const caption = `🔥 *\`Título:\`* ${title}
🤍 *\`Calidad:\`* ${quality}
🚩 *\`Miniatura:\`* (${thumbnail})
🌩 *\`Descargar el video:\`* ${download_url}`;

    // Enviar el video y el texto
    await conn.sendMessage(m.chat, {
      video: { url: download_url },
      caption: caption,
      thumbnail: { url: thumbnail },
    }, { quoted: m });

    // Notificar al usuario sobre la finalización exitosa
    await m.reply('✅ *¡Video enviado con éxito!*');

  } catch (error) {
    console.error('Error en el comando ytmp4:', error.message);
    m.reply('⚠️ *Ocurrió un error al procesar tu solicitud.* Por favor, intenta nuevamente más tarde.');
  }
};

handler.help = ['test2'];
handler.tags = ['descargar'];
handler.command = /^test2$/i;

export default handler;