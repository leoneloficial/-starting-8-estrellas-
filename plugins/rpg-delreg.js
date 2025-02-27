import db from '../lib/database.js';

let handler = async function (m, { conn, text }) {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            who = text.includes('@') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
        }
    } else {
        who = m.chat;
    }

    if (!who) return m.reply('*✧ Por favor, menciona al usuario o ingresa su número.*');

    let users = global.db.data.users;

    if (!users[who]) return m.reply('⚠️ *El usuario no está registrado en la base de datos.*');

    delete users[who];

    m.reply(`🗑️ *Registro eliminado*\n@${who.split('@')[0]} ha sido eliminado de la base de datos.`, null, { mentions: [who] });
};

handler.help = ['unregister <@user|número>'];
handler.tags = ['owner'];
handler.command = ['unregister', 'unreg', 'delreg', 'eliminarreg'];
handler.rowner = true; // Solo para owners

export default handler;