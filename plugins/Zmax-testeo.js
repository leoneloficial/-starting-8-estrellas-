import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) throw "⚠️ Debes escribir el nombre de la música.";

    m.reply("📡 Buscando en YouTube... 🔎");

    const search = await yts(text);
    if (!search.all.length) return m.reply("❌ No se encontraron resultados.");

    const videoInfo = search.all[0];
    console.log("🔗 URL obtenida:", videoInfo.url);

    // Depuración para evitar URL inválidas
    if (!videoInfo.url || !videoInfo.url.startsWith("http")) {
      console.error("🚨 Error: URL inválida:", videoInfo.url);
      return m.reply("❌ Ocurrió un error al obtener el enlace.");
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera antes de enviar

    // Enviar mensaje con botones
    let message = {
      image: { url: videoInfo.thumbnail },
      caption: `✅ *Video encontrado:*\n📌 *${videoInfo.title}*\n🎵 *Canal:* ${videoInfo.author.name}\n👀 *Vistas:* ${videoInfo.views}\n📅 *Publicado:* ${videoInfo.ago}\n🔗 ${videoInfo.url}`,
      footer: "Selecciona una opción para descargar:",
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎵 Descargar MP3' }, type: 1 },
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📹 Descargar MP4' }, type: 1 }
      ],
      headerType: 4
    };

    await conn.sendMessage(m.chat, message, { quoted: m });

  } catch (err) {
    console.error("🚨 Error detectado:", err);
    m.reply(`⚠️ Error: ${err.message || "Ocurrió un error inesperado."}`);
  }
};

handler.command = ['play'];
export default handler;