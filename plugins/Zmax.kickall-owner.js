var handler = async (m, { conn, participants }) => {
    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

    // Verifica si el usuario es owner del bot
    if (!global.owner.some(([v]) => v + '@s.whatsapp.net' === m.sender)) {
        return conn.reply(m.chat, '🍭 Solo los owners pueden usar este comando.', m);
    }

    // Obtiene todos los miembros excepto el owner del grupo y el bot
    const usersToRemove = participants
        .map(user => user.id)
        .filter(user => user !== ownerGroup && user !== conn.user.jid && user !== ownerBot);

    if (usersToRemove.length === 0) {
        return conn.reply(m.chat, '🍭 No hay miembros que puedan ser eliminados.', m);
    }

    // Divide la eliminación en lotes de 5 para mayor rapidez y evitar bloqueos
    const batchSize = 5;
    for (let i = 0; i < usersToRemove.length; i += batchSize) {
        const batch = usersToRemove.slice(i, i + batchSize);
        await conn.groupParticipantsUpdate(m.chat, batch, 'remove');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1s para evitar detección de spam
    }

    conn.reply(m.chat, `🗑 Se han eliminado ${usersToRemove.length} miembros del grupo.`, m);
};

handler.help = ['killall-owner'];
handler.tags = ['grupo'];
handler.command = ['killall-owner'];
handler.owner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;