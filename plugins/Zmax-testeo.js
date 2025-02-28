import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    console.log("✅ Comando recibido:", command);
    console.log("🔍 Texto de búsqueda:", text);

    if (!text) {
      console.log("⚠️ No se ingresó texto.");
      return m.reply("⚠️ Debes escribir el nombre de la música.");
    }

    m.reply("📡 Buscando en YouTube... 🔎");
    console.log("🔍 Buscando en YouTube...");

    const search = await yts(text);
    console.log("✅ Búsqueda completada:", search.all);

    if (!search.all.length) {
      console.log("❌ No se encontraron resultados.");
      return m.reply("❌ No se encontraron resultados.");
    }

    const videoInfo = search.all[0];
    let message = `🎵 *Música Encontrada*\n\n📌 *Título:* ${videoInfo.title}\n🎬 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n👀 *Vistas:* ${videoInfo.views}\n⏳ *Duración:* ${videoInfo.timestamp}\n📆 *Publicado:* ${videoInfo.ago}\n🔗 *Enlace:* ${videoInfo.url}`;

    console.log("📩 Enviando mensaje con info del video...");

    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: message,
      footer: "Bot WhatsApp",
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎶 Descargar MP3' } },
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📹 Descargar MP4' } }
      ],
      headerType: 4
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