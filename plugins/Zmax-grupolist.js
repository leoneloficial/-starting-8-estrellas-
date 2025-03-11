let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply('⚠️ Debes proporcionar el enlace del grupo.');
    }

    const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]+)/;
    const match = args[0].match(linkRegex);
    if (!match) {
        return m.reply('⚠️ El enlace proporcionado no es válido.');
    }

    const groupCode = match[1];

    try {
        // Buscar el grupo en la lista de chats del bot
        let groupId;
        for (let chat of Object.values(conn.chats)) {
            if (chat.id.includes('@g.us')) {
                let metadata = await conn.groupMetadata(chat.id).catch(() => null);
                if (metadata && metadata.inviteCode === groupCode) {
                    groupId = metadata.id;
                    break;
                }
            }
        }

        if (!groupId) {
            return m.reply('⚠️ No encontré el grupo o no estoy en él.');
        }

        // Enviar mensaje de despedida y salir del grupo
        await conn.reply(groupId, `✎ *Adiós a todos, el Bot se despide! (≧ω≦)ゞ*`);
        await conn.groupLeave(groupId);

        m.reply(`🚪 Salí del grupo: ${groupId}`);
    } catch (e) {
        console.error(e);
        m.reply('⚠️ No pude procesar la solicitud.');
    }
};

handler.command = ['LeaveCD'];
handler.rowner = true; // Solo el dueño del bot puede usarlo
export default handler;