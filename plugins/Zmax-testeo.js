import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "⚠️ Por favor ingresa la música que deseas descargar.";

  console.log("Texto recibido:", text); // Depuración
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "❌ No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  console.log("Objeto completo del video:", videoInfo); // Depuración
  console.log("URL obtenida antes de ajuste:", videoInfo?.url); // Depuración de la URL

  if (!videoInfo.url || !videoInfo.videoId) {
    throw `❌ No se pudo obtener una URL válida para la descarga.\n🔍 Objeto recibido: ${JSON.stringify(videoInfo, null, 2)}`;
  }

  // Construir la URL manualmente y normalizarla
  let url = `https://www.youtube.com/watch?v=${videoInfo.videoId}`;
  url = encodeURI(url); // Asegurar que sea una URL válida

  console.log("URL corregida y codificada:", url); // Confirmar que se generó bien

  try {
    new URL(url); // Verificar si la URL es válida
  } catch (err) {
    console.error("Error con la URL:", err);
    throw "❌ Error: La URL generada no es válida.";
  }

  const body = `🎵 Descargando *<${videoInfo.title}>*\n\n📺 Canal: *${videoInfo.author.name || 'Desconocido'}*\n👁️‍🗨️ Vistas: *${videoInfo.views}*\n⏳ Duración: *${videoInfo.timestamp}*\n🗓️ Publicado: *${videoInfo.ago}*\n🔗 Link: ${url}`;

  await conn.sendMessage(m.chat, {
    image: { url: videoInfo.thumbnail },
    caption: body,
    buttons: [
      { buttonId: `.yta ${url}`, buttonText: { displayText: '🎧 Audio' } },
      { buttonId: `.ytv ${url}`, buttonText: { displayText: '🎥 Video' } },
    ],
    headerType: 4,
  }, { quoted: m });

  m.react('🎶');
};

handler.help = ['play', 'playvid', 'ytv', 'yta', 'play2'];
handler.command = ['play', 'playvid', 'ytv', 'yta', 'play2'];
handler.tags = ['dl'];
handler.register = true;

export default handler;