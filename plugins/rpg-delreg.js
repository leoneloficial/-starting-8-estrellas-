//Zaphkiel Solo borra el registro de usuario sin tocar dinero o objetos


import db from '../lib/database.js';
import PhoneNumber from 'awesome-phonenumber';

let handler = async function (m, { conn, text }) {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]; // Si mencionaron a alguien, tomamos su JID.
        } else if (text) {
            let num = text.replace(/[^0-9]/g, ''); // Extraemos solo los números.
            let parsedNum = PhoneNumber(`+${num}`).getNumber('e164'); // Convertimos a formato internacional.
            who = parsedNum ? parsedNum.replace(/\+/g, '') + '@s.whatsapp.net' : null;
        }
    } else {
        if (text) {
            let num = text.replace(/[^0-9]/g, '');
            let parsedNum = PhoneNumber(`+${num}`).getNumber('e164');
            who = parsedNum ? parsedNum.replace(/\+/g, '') + '@s.whatsapp.net' : null;
        } else {
            who = m.chat;
        }
    }

    if (!who) return m.reply('《✦》*Por favor, menciona al usuario o ingresa su número.*');

    let users = global.db.data.users;

    if (!(who in users)) return m.reply('《✧》 *El usuario no está registrado en la base de datos.*');

    delete users[who];

    m.reply(`《✧》 *Registro eliminado*\n@${who.split('@')[0]} ha sido eliminado de la base de datos.`, null, { mentions: [who] });
};

handler.help = ['unregister <@user|número>'];
handler.tags = ['owner'];
handler.command = ['unregister', 'unreg', 'delreg', 'eliminarreg'];
handler.rowner = true; // Solo para owners

export default handler;