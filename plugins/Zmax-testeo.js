import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) throw "⚠️ Debes escribir el nombre de la música.";

    m.reply("📡 Buscando en YouTube... 🔎");

    const search = await yts(text);
    if (!search.all.length) return m.reply("❌ No se encontraron resultados.");

    const videoInfo = search.all[0];
    console.log("🔗 URL obtenida:", videoInfo.url);

    if (!videoInfo.url || !videoInfo.url.startsWith("http")) {
      console.error("🚨 Error: URL inválida:", videoInfo.url);
      return m.reply("❌ Ocurrió un error al obtener el enlace.");
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera antes de enviar

    // Nueva estructura de botones con templateMessage
    let buttons = [
      { index: 1, quickReplyButton: { displayText: "🎵 Descargar MP3", id: `.ytmp3 ${videoInfo.url}` } },
      { index: 2, quickReplyButton: { displayText: "📹 Descargar MP4", id: `.ytmp4 ${videoInfo.url}` } }
    ];

    let templateMessage = {
      text: `✅ *Video encontrado:*\n📌 *${videoInfo.title}*\n🎵 *Canal:* ${videoInfo.author.name}\n👀 *Vistas:* ${videoInfo.views}\n📅 *Publicado:* ${videoInfo.ago}\n🔗 ${videoInfo.url}`,
      footer: "Selecciona una opción:",
      templateButtons: buttons
    };

    await conn.sendMessage(m.chat, templateMessage, { quoted: m });

  } catch (err) {
    console.error("🚨 Error detectado:", err);
    m.reply(`⚠️ Error: ${err.message || "Ocurrió un error inesperado."}`);
  }
};

handler.command = ['play'];
export default handler;