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
      return m.reply("⚠️ Error: La URL del video no es válida.");
    }

    if (command === 'yta' || command === 'ytmp3') {
      let apiUrl = `https://api.example.com/ytmp3?url=${encodeURIComponent(videoInfo.url)}`;
      console.log("📡 URL de la API:", apiUrl);

      let audio = await fetch(apiUrl).then(res => res.json()).catch(err => {
        console.error("❌ Error en la API:", err);
        return null;
      });

      if (!audio || !audio.data || !audio.data.url) {
        return m.reply("⚠️ Error al obtener el audio.");
      }

      await conn.sendMessage(m.chat, { 
        document: { url: audio.data.url }, 
        mimetype: "audio/mpeg", 
        fileName: `${videoInfo.title}.mp3` 
      }, { quoted: m });

      m.react('✅');
    }

  } catch (err) {
    console.error("🚨 Error detectado:", err);
    m.reply(`⚠️ Error: ${err.message || "Ocurrió un error inesperado."}`);
  }
};

handler.command = ['play', 'ytmp3'];
export default handler;