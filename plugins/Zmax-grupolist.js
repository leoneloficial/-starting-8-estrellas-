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
        // Buscar el grupo en la lista de chats donde el bot está
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
        let groupId = null;

        for (let [jid, chat] of groups) {
            let metadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch(() => null))) || {};
            let inviteCode = await conn.groupInviteCode(jid).catch(() => null);

            if (inviteCode === groupCode) {
                groupId = jid;
                break;
            }
        }

        if (!groupId) {
            return m.reply('⚠️ No encontré el grupo o no estoy en él.');
        }

        // Enviar mensaje de despedida y salir del grupo
        await conn.reply(groupId, `✎ *Adiós a todos, el Bot se despide! (≧ω≦)ゞ*`);
        await conn.groupLeave(groupId);

        m.reply(`🚪 Salí del grupo: ${await conn.getName(groupId)}`);
    } catch (e) {
        console.error(e);
        m.reply('⚠️ No pude procesar la solicitud.');
    }
};

handler.command = ['leavecd'];
handler.rowner = true; // Solo el dueño del bot puede usarlo
export default handler;