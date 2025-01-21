import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("🍬 Ingresa el texto de lo que quieres buscar.");
  }

  let ytres = await yts(text);
  let video = ytres.all[0];  // Cambié de .videos a .all para obtener los resultados correctos

  if (!video) {
    return m.reply("🍭 No se encontraron resultados...");
  }

  let { title, thumbnail, timestamp, views, ago, url, author } = video;

  let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

  let HS = `🎬 Título: *${title}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🕒 Duración: *${timestamp}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 👀 Vistas: *${vistas}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🍬 Canal *${author?.name || 'Desconocido'}*  // Uso de optional chaining para evitar errores si 'author' es undefined
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 📆 Publicado *${ago}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🔗 Enlace: ${url}`;

  let thumb = (await conn.getFile(thumbnail))?.data;

  let JT = {
    contextInfo: {
      externalAdReply: {
        title: title,
        body: "",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true,
      },
    },
  };

  await conn.reply(m.chat, HS, m, JT);

  try {
    let api = await fetch(`https://api.lyrax.net/api/dl/yt2?url=${encodeURIComponent(url)}`);  // Corrección en la URL
    let json = await api.json();
    let { download } = json.result;

    await conn.sendMessage(m.chat, {
      audio: { url: download.url },
      caption: ``,
      mimetype: "audio/mpeg",
    }, { quoted: m });
  } catch (error) {
    console.error(error);
  }
};

handler.command = ['play'];

export default handler;