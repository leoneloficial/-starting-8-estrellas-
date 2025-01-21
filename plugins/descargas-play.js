import yts from "yt-search";
import ytdl from "ytdl-core";

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("🍬 Ingresa el texto de lo que quieres buscar.");
    }

    // Realiza la búsqueda en YouTube
    let ytres = await yts(text);
    let video = ytres.videos[0];

    if (!video) {
        return m.reply("🍭 No se encontraron resultados...");
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = video;

    let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

    // Mensaje de detalles del video
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

    // Miniatura del video
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

    // Enviar detalles del video
    await conn.reply(m.chat, HS, m, JT);

    try {
        console.log(`Intentando obtener el audio de la URL: ${url}`);
        
        // Descargar el audio utilizando ytdl-core
        let audioStream = ytdl(url, { quality: "highestaudio" });
        
        // Enviar el audio directamente al chat
        await conn.sendMessage(
            m.chat,
            {
                audio: audioStream,
                mimetype: "audio/mp4",
                fileName: `${title}.mp3`,
                caption: `🎶 Aquí tienes el audio: *${title}*`,
            },
            { quoted: m }
        );

        console.log("Audio enviado correctamente.");
    } catch (error) {
        console.error("Ocurrió un error al intentar obtener el audio:", error);
        m.reply("😓 Ocurrió un error al intentar obtener el audio.");
    }
};

handler.command = ['play'];

export default handler;