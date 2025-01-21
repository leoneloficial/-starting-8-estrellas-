import fetch from "node-fetch";
import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("🍬 Ingresa el texto de lo que quieres buscar.");
    }

    const appleMusicSearch = async (query) => {
        const url = `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            const result = $('.desktop-search-page .section[data-testid="section-container"] .grid-item').first();
            if (!result.length) return null;

            const title = result.find('.top-search-lockup__primary__title').text().trim();
            const artist = result.find('.top-search-lockup__secondary').text().trim();
            const link = result.find('.click-action').attr('href');
            const thumbnail = result.find('img').attr('src');

            return { title, artist, link, thumbnail };
        } catch (error) {
            console.error("Error en búsqueda de Apple Music:", error.message);
            return null;
        }
    };

    const appleMusicDownload = async (url) => {
        try {
            const apiResponse = await fetch(`https://aaplmusicdownloader.com/api/applesearch.php?url=${url}`);
            const data = await apiResponse.json();
            if (data && data.url) {
                return data.url; // URL de descarga
            }
            return null;
        } catch (error) {
            console.error("Error obteniendo datos de Apple Music:", error.message);
            return null;
        }
    };

    // Búsqueda en Apple Music
    const searchResult = await appleMusicSearch(text);
    if (!searchResult) {
        return m.reply("🍭 No se encontraron resultados...");
    }

    const { title, artist, link, thumbnail } = searchResult;

    const HS = `🎶 Título: *${title}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🎤 Artista: *${artist}*
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> 🔗 Enlace: ${link}`;

    let thumb = (await conn.getFile(thumbnail))?.data;

    let JT = {
        contextInfo: {
            externalAdReply: {
                title: title,
                body: artist,
                mediaType: 1,
                previewType: 0,
                mediaUrl: link,
                sourceUrl: link,
                thumbnail: thumb,
                renderLargerThumbnail: true,
            }
        }
    };

    await conn.reply(m.chat, HS, m, JT);

    // Descargar música
    try {
        console.log(`Intentando obtener el audio de la URL: ${link}`);
        const downloadUrl = await appleMusicDownload(link);
        if (downloadUrl) {
            console.log("Enlace de descarga encontrado:", downloadUrl);

            await conn.sendMessage(m.chat, {
                audio: { url: downloadUrl },
                caption: `🎶 Aquí tienes tu música: ${title}`,
                mimetype: "audio/mpeg",
            }, { quoted: m });
        } else {
            console.error("Error: No se encontró un enlace de descarga.");
            m.reply("😓 No se pudo obtener el enlace de audio.");
        }
    } catch (error) {
        console.error("Ocurrió un error al intentar obtener el audio:", error);
        m.reply("😓 Ocurrió un error al intentar obtener el audio.");
    }
};

handler.command = ['play'];

export default handler;