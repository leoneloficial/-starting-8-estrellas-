import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            const quoted = m.quoted ? m.quoted.sender : null;
            who = quoted ? quoted : m.chat;
        }
    } else {
        who = m.chat;
    }

    if (!who) return m.reply('*✧ Por favor, menciona al usuario o cita un mensaje.*');

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) return m.reply('*🍬 Por favor, ingresa la cantidad que deseas quitar.*');
    if (isNaN(txt)) return m.reply('🍭 *Sólo números*');

    let dmt = parseInt(txt);
    if (dmt < 1) return m.reply('🍭 Mínimo es *1*');

    let users = global.db.data.users;
    
    // Asegurar que el usuario esté registrado en la base de datos
    if (!users[who]) users[who] = { coin: 0 };
    
    // Asegurar que el saldo inicial no sea undefined o NaN
    if (typeof users[who].coin !== 'number' || isNaN(users[who].coin)) {
        users[who].coin = 0;
    }

    if (users[who].coin < dmt) {
        return m.reply(`💸 *Error:* @${who.split('@')[0]} no tiene suficientes monedas.`, null, { mentions: [who] });
    }

    users[who].coin -= dmt;

    m.reply(`💸 *Quitado:*\n» ${dmt} monedas\n@${who.split('@')[0]}, te han quitado ${dmt} 💸`, null, { mentions: [who] });
};

handler.help = ['removecoins *<@user>*'];
handler.tags = ['owner'];
handler.command = ['quitarcoin', 'removecoin', 'removecoins']; 
handler.rowner = true;

export default handler;