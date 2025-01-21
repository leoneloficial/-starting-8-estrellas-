import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("🍬 Ingresa el texto de lo que quieres buscar.");
    }

    let ytres = await yts(text);
    let video = ytres.videos[0];

    if (!video) {
        return m.reply("🍭 No se encontraron resultados...");
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = video;

    let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

    let HS = `🎬 *Título:* ${title}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🕒 *Duración:* ${timestamp}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 👀 *Vistas:* ${vistas}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🍬 *Canal:* ${author.name || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 📆 *Publicado:* ${ago}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🔗 *Enlace:* ${url}`;

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
            }
        }
    };

    // Enviar mensaje con el diseño
    await conn.reply(m.chat, HS, m, JT);
};

handler.command = ['play'];

export default handler;