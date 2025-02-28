import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw "❌ Ingresa el nombre de la música.";

  m.reply("📡 Buscando en YouTube... 🔎");

  try {
    const isVideo = /vid|2|mp4|v$/.test(command);
    const search = await yts(text);

    if (!search.all.length) throw "❌ No se encontraron resultados.";

    const videoInfo = search.all[0];

    console.log("🔗 URL obtenida:", videoInfo.url);

    if (!videoInfo.url || !videoInfo.url.startsWith("http")) {
      console.error("🚨 URL inválida:", videoInfo.url);
      return m.reply("❌ Ocurrió un error al obtener el enlace.");
    }

    let body = `🎵 *Descargando:* ${videoInfo.title}\n\n📺 *Canal:* ${videoInfo.author.name}\n👀 *Vistas:* ${videoInfo.views}\n⏳ *Duración:* ${videoInfo.timestamp}\n📅 *Publicado:* ${videoInfo.ago}\n🔗 *Enlace:* ${videoInfo.url}`;

    let buttons = [
      { index: 1, quickReplyButton: { displayText: "🎶 Descargar MP3", id: `.ytmp3 ${videoInfo.url}` } },
      { index: 2, quickReplyButton: { displayText: "📹 Descargar MP4", id: `.ytmp4 ${videoInfo.url}` } }
    ];

    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "Selecciona una opción:",
      templateButtons: buttons
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