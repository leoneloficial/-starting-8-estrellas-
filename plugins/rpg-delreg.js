import db from '../lib/database.js';

let handler = async function (m, { conn, text }) {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]; // Si mencionaron a alguien, tomamos su JID.
        } else if (text) {
            let number = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Extraemos solo los números y formateamos.
            who = number.length > 15 ? null : number; // Validamos que no sea un número inválido.
        }
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    if (!who) return m.reply('*✧ Por favor, menciona al usuario o ingresa su número.*');

    let users = global.db.data.users;

    if (!(who in users)) return m.reply('⚠️ *El usuario no está registrado en la base de datos.*');

    delete users[who];

    m.reply(`🗑️ *Registro eliminado*\n@${who.split('@')[0]} ha sido eliminado de la base de datos.`, null, { mentions: [who] });
};

handler.help = ['unregister <@user|número>'];
handler.tags = ['owner'];
handler.command = ['unregister', 'unreg', 'delreg', 'eliminarreg'];
handler.rowner = true; // Solo para owners

export default handler;