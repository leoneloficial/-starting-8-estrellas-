import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
  if (!text) throw "⚠️ Ingresa el nombre de la música.";

  console.log("🔎 Buscando:", text);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) throw "❌ No se encontraron resultados.";

  const videoInfo = search.all[0];
  console.log("📄 Datos del video:", videoInfo);

  if (!videoInfo.videoId) throw "❌ No se pudo obtener el ID del video.";

  // Generar URL correctamente
  let url = `https://www.youtube.com/watch?v=${videoInfo.videoId}`;

  try {
    url = new URL(url).href; // Validar y normalizar la URL
    console.log("✅ URL final:", url);
  } catch (err) {
    console.error("❌ Error con la URL:", err);
    throw "❌ Error: URL generada no válida.";
  }

  const mensaje = `🎵 Descargando *${videoInfo.title}*\n\n📺 Canal: *${videoInfo.author.name}*\n🔗 Link: ${url}`;

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
  m.react('🎶');
};

handler.command = ['ytmp3'];
export default handler;