let handler = async (m, { conn, text, command }) => {
    if (!text) {
        return m.reply('⚠️ Debes proporcionar el enlace del grupo.');
    }

    const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]+)/;
    const match = text.match(linkRegex);
    if (!match) {
        return m.reply('⚠️ El enlace proporcionado no es válido.');
    }

    const groupCode = match[1];

    try {
        // Obtener el ID del grupo desde el enlace sin unirse
        let groupMetadata = await conn.groupAcceptInvite(groupCode).catch(() => null);

        if (!groupMetadata) {
            return m.reply('⚠️ No encontré el grupo o no puedo acceder a él.');
        }

        let groupId = groupMetadata.id;

        // Verificar si el bot realmente está en el grupo
        let inGroup = conn.chats.has(groupId);
        if (!inGroup) {
            return m.reply('⚠️ No estoy en este grupo.');
        }

        // Enviar mensaje de despedida y salir
        await conn.reply(groupId, `✎ *Adiós a todos, el Bot se despide! (≧ω≦)ゞ*`);
        await conn.groupLeave(groupId);

        m.reply(`🚪 Salí del grupo: ${groupMetadata.subject}`);
    } catch (e) {
        console.error(e);
        m.reply('⚠️ No pude procesar la solicitud.');
    }
};

handler.command = ['LeaveCD'];
handler.rowner = true; // Solo el dueño del bot puede usarlo
export default handler;