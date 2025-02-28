export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    let videoWelcome = 'https://files.catbox.moe/ox19vs.mp4';
    let videoGoodbye = 'https://files.catbox.moe/ox19vs.mp4';

    let chat = global.db.data.chats[m.chat];
    const getMentionedJid = () => {
        return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
    };

    let who = m.messageStubParameters[0] + '@s.whatsapp.net';
    let user = global.db.data.users[who];

    let userName = user ? user.name : await conn.getName(who);
    if (!userName) {
        userName = who.split('@')[0]; 
    } else {
        userName = userName.trim(); 
    }

    let groupDesc = groupMetadata.desc ? groupMetadata.desc : '¡No hay descripción establecida!';

    if (chat.welcome && m.messageStubType === 27) {
        this.sendMessage(m.chat, {
            video: { url: videoWelcome },
            caption: `💫 ¡Bienvenido, ${userName}! 💞\n\n` +
                     `Estamos encantados de tenerte aquí. Informa aquí:\n\n` +
                     `*Descripción del grupo:*\n\n${groupDesc}`,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: getMentionedJid(),
                "externalAdReply": {
                    "title": `  ͟͞ Ｗ Ｅ Ｌ Ｃ Ｏ Ｍ Ｅ ͟͞  `,
                    "body": '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Leonel',
                    "previewType": "PHOTO",
                    "thumbnailUrl": null,
                    "thumbnail": null,
                    "sourceUrl": null,
                    "showAdAttribution": true
                }
            }
        }, { quoted: fkontak });
    }

    if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
        this.sendMessage(m.chat, {
            video: { url: videoGoodbye },
            caption: `👋 Adiós, ${userName}. ¡Te deseamos lo mejor en tus futuros caminos! 👋`,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: getMentionedJid(),
                "externalAdReply": {
                    "title": `  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  `,
                    "body": `© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Leonel`,
                    "previewType": "PHOTO",
                    "thumbnailUrl": null,
                    "thumbnail": null,
                    "sourceUrl": null,
                    "showAdAttribution": true
                }
            }
        }, { quoted: fkontak });
    }
}