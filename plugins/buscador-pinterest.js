/* Codigo creado por 
 - @Rayo-ofc 
*/
import axios from 'axios';

const handler = async (m, { conn, text }) => {
    try {
        if (!text) {
            await conn.sendMessage(m.chat, { text: '✎ Por favor proporciona un término de búsqueda.' }, { quoted: m, rcanal });
            return;
        }

        const response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
        const data = response.data.data;

        if (data.length === 0) {
            await conn.sendMessage(m.chat, { text: `❌ No se encontraron imágenes para "${text}".` }, { quoted: m });
            return;
        }

        const randomImage = data[Math.floor(Math.random() * data.length)];
        const imageUrl = randomImage.images_url;
        const title = randomImage.grid_title || `¡Aquí tienes una imagen de ${text}!`;

        await m.react('🕓');
        
        await conn.sendMessage(
            m.chat,
            { 
                image: { url: imageUrl },
                caption: `\t\t⚘ *${title}*\n ${global.dev}`,
                buttons: [
                    { 
                        buttonId: `.pinterest ${text}`, 
                        buttonText: { displayText: 'ᯓsiguente' },
                        type: 1  
                    }
                ],
                viewOnce: true,
                headerType: 4
            },
            { quoted: m }
        );

        await m.react('✅');
    } catch (error) {
        await m.react('✖️');
        console.error('Error al obtener la imagen:', error);
        await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar obtener la imagen. Inténtalo nuevamente.' }, { quoted: m });
    }
};

handler.help = ['pinterest <término>'];
handler.tags = ['img'];
handler.register = true;
handler.command = ['pinterest'];

export default handler;