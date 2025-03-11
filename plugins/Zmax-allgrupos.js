let handler = async (m, { conn }) => {
    try {
        
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);

        if (groups.length === 0) {
            return m.reply('⚠️ No estoy en ningún grupo.');
        }

        let currentGroup = m.chat; // Grupo donde se envió el comando
        let leftGroups = 0;

        for (let [jid] of groups) {
            if (jid !== currentGroup) { 
                await conn.reply(jid, `✎ *Orden de salida, Adios a todos, el Bot se despide! (≧ω≦)ゞ*`);
                await conn.groupLeave(jid);
                leftGroups++;
            }
        }

        m.reply(`🚪 Salí de ${leftGroups} grupos. Solo permanezco en este.`);

    } catch (e) {
        console.error(e);
        m.reply('⚠️ Hubo un error al intentar salir de los grupos.');
    }
};

handler.command = ['leaveall-owner'];
handler.rowner = true; 
export default handler;