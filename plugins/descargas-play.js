import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import yts from 'yt-search';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);

    if (!text) return conn.reply(m.chat, '🤍 Ingresa el nombre de una musica de YouTube', m, rcanal);
    m.react('🌟');

    if (device !== 'desktop' && device !== 'web') {
        const results = await yts(text);
        const videos = results.videos.slice(0, 20);
        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];
m.react('🎶');
        const messa = await prepareWAMessageMedia({ image: { url: randomVideo.thumbnail }}, { upload: conn.waUploadToServer });
        const interactiveMessage = {
            body: {
                text: `乂  Y O U T U B E  -  P L A Y\n\n» *Título:* ${randomVideo.title}\n» *Duración:* ${randomVideo.duration.timestamp}\n» *Autor:* ${randomVideo.author.name || 'Desconocido'}\n» *Publicado:* ${randomVideo.ago}\n» *Enlace:* ${randomVideo.url}\n`
            },
            footer: { text: `${global.dev}`.trim() },
            header: {
                title: `> ✨ Búsqueda de Video ✨\n`,
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: '> OPCIONES DE DESCARGA',
                            sections: videos.map((video) => ({
                                title: video.title,
                                rows: [
                                    { header: video.title, title: video.author.name, description: 'Descargar MP3 (Audio)', id: `${prefijo}ytmp3 ${video.url}` },
                                    { header: video.title, title: video.author.name, description: 'Descargar MP4 (Video)', id: `${prefijo}test2 ${video.url}` },
                                    { header: video.title, title: video.author.name, description: 'Descargar MP3 como Documento', id: `${prefijo}play4 ${video.url}` },
                                    { header: video.title, title: video.author.name, description: 'Descargar MP4 como Documento', id: `${prefijo}ytmp4doc ${video.url}` }
                                ]
                            }))
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: null });
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        const idioma = global.db.data.users[m.sender].language;
        const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
        const traductor = _translate.plugins.buscador_yts;
        const results = await yts(text);
        const tes = results.all;
        const teks = results.all.map((v) => {
            if (v.type === 'video') return `
° *_${v.title}_*
↳ 🫐 *_Enlace :_* ${v.url}
↳ 🕒 *_Duración :_* ${v.timestamp}
↳ 📥 *_Subido :_* ${v.ago}
↳ 👁 *_Vistas :_* ${v.views}`;
        }).filter(v => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
        conn.sendFile(m.chat, tes[0].thumbnail, 'error.jpg', teks.trim(), m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];
handler.register = true;

export default handler;