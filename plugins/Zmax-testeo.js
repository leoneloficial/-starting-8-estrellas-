import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    console.log("✅ Comando recibido:", command);
    console.log("🔍 Texto de búsqueda:", text);

    if (!text) return m.reply("⚠️ Debes escribir el nombre de la música.");

    m.reply("📡 Buscando en YouTube... 🔎");

    const search = await yts(text);
    console.log("✅ Búsqueda completada:", search.all);

    if (!search.all.length) return m.reply("❌ No se encontraron resultados.");

    const videoInfo = search.all[0];

    console.log("📩 Enviando mensaje con info del video...");

    await conn.sendMessage(m.chat, {
      text: `🎵 *${videoInfo.title}*\n🔗 ${videoInfo.url}`,
      footer: "Bot WhatsApp",
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎶 MP3' }, type: 1 },
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📹 MP4' }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });

  } catch (err) {
    console.error("🚨 Error detectado:", err);
    m.reply(`⚠️ Error: ${err.message || "Ocurrió un error inesperado."}`);
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;