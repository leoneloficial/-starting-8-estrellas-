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
        // Obtener la lista de grupos donde el bot está
        let groups = await conn.groupFetchAllParticipating();
        let groupId = Object.keys(groups).find(id => groups[id].inviteCode === groupCode);

        if (!groupId) {
            return m.reply('⚠️ No encontré el grupo o no estoy en él.');
        }

        // Enviar mensaje de despedida y salir del grupo
        await conn.reply(groupId, `✎ *Adiós a todos, el Bot se despide! (≧ω≦)ゞ*`);
        await conn.groupLeave(groupId);

        m.reply(`🚪 Salí del grupo: ${groups[groupId].subject}`);
    } catch (e) {
        console.error(e);
        m.reply('⚠️ No pude procesar la solicitud.');
    }
};

handler.command = ['leavecd'];
handler.rowner = true; // Solo el dueño del bot puede usarlo
export default handler;