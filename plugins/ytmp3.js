import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Ingresa una URL de YouTube.');

    await m.react('⏳');

    let apiUrl = `https://good-camel-seemingly.ngrok-free.app/download/mp3?url=${encodeURIComponent(text)}`;

    try {
        let { data } = await axios.get(apiUrl);

        const title = data.title;
        const thumbnail = data.thumbnail;
        const downloadUrl = data.download_url;

        await conn.sendMessage(m.chat, { 
            audio: { url: downloadUrl }, 
            mimetype: 'audio/mpeg',  
            fileName: `${title}.mp3`
        }, { quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error("❌ Error en la descarga:", error);
        await m.react('❌');
    }
};

handler.command = /^ytmp3/i; 
export default handler;