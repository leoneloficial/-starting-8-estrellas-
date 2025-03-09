import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw "⚠️ Por favor ingresa la música que deseas descargar.";

  const search = await yts(text);
  if (!search.all || search.all.length === 0) throw "❌ No se encontraron resultados.";

  const videoInfo = search.all[0];
  const body = `「✦」 Descarga de *${videoInfo.title}*\n\n` +
    `📺 Canal: *${videoInfo.author.name || 'Desconocido'}*\n` +
    `👀 Vistas: *${videoInfo.views}*\n` +
    `⏳ Duración: *${videoInfo.timestamp}*\n` +
    `📅 Publicado: *${videoInfo.ago}*\n` +
    `🔗 Link: ${videoInfo.url}`;

  if (command === 'play' || command === 'playvid' || command === 'play2') {
    let msg = await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "📡 Descarga rápida",
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎵 Audio' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎥 Video' } },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    global.play[msg.key.id] = { url: videoInfo.url };
    return;
  }

  const fetchFromAPIs = async (url, type) => {
    const apis = [
      `https://api.alyachan.dev/api/youtube?url=${url}&type=${type}&apikey=Gata-Dios`,
      `https://delirius-apiofc.vercel.app/download/yt${type}?url=${url}`,
      `https://api.vreden.my.id/api/yt${type}?url=${url}`
    ];

    for (let api of apis) {
      try {
        let res = await fetch(api);
        let json = await res.json();
        if (json.data && json.data.url) return json.data.url;
      } catch (e) { /* Ignorar errores y probar con la siguiente API */ }
    }
    throw "⚠️ No se pudo obtener el archivo.";
  };

  if (command === 'yta' || command === 'ytmp3') {
    let audioUrl = await fetchFromAPIs(videoInfo.url, "mp3");
    await conn.sendFile(m.chat, audioUrl, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg" });
    return;
  }

  if (command === 'ytv' || command === 'ytmp4') {
    let videoUrl = await fetchFromAPIs(videoInfo.url, "mp4");
    await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: "video/mp4", caption: "" }, { quoted: m });
    return;
  }

  throw "❌ Comando no reconocido.";
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.group = true;
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  if (match) return match[1];
  throw new Error("❌ URL de YouTube inválida.");
};