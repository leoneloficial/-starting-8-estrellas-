const handler = async (m, { conn, args, text, usedPrefix, command }) => {

if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}
    let user;
    let db = global.db.data.users;
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        await conn.reply(m.chat, `✎ Por favor, etiqueta o coloca el número del usuario que quieres desbanear del Bot.*`, m);
        return;
    }
    if (db[user]) {
        db[user].banned = false;
        db[user].banRazon = '';
        const nametag = await conn.getName(user);
        const nn = conn.getName(m.sender);
        await conn.reply(m.chat, `✅️ El usuario *${nametag}* ha sido desbaneado.`, m, { mentionedJid: [user] });
       conn.reply('584164137403@s.whatsapp.net', `✎ El usuario *${nametag}* ha sido desbaneado por *${nn}*.`, m, rcanal);
conn.reply('50558124470@s.whatsapp.net', `✎ El usuario *${nametag}* ha sido desbaneado por *${nn}*.`, m, rcanal);
        await conn.reply(m.chat, `✧ El usuario no está registrado.`, m);
    }
};
handler.help = ['unbanuser <@tag>'];
handler.command = ['unbanuser'];
handler.tags = ['mods'];
handler.mods = true;
export default handler;