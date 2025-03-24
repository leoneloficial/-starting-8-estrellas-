
import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let pajak = 0;

if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}

const handler = async (m, { conn, text }) => {
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
    
    if (!who) return m.reply('*✎ Por favor, menciona al usuario o cita un mensaje.*');

    const txt = text.replace('@' + who.split('@')[0], '').trim(); // Corregido
    if (!txt) return m.reply('*✎ Ingresa la cantidad de experiencia (XP) que deseas añadir.*');
    if (isNaN(txt)) return m.reply('🍭 *Solo números son permitidos.*');
    
    const xp = parseInt(txt);
    let exp = xp;
    const pjk = Math.ceil(xp * pajak);
    exp += pjk;
    
    if (exp < 1) return m.reply('✎ El mínimo de experiencia (XP) para añadir es *1*.');
    
    const users = global.db.data.users;
    users[who].exp += xp;
    
    m.reply(`✨ XP Añadido: *${xp}* \n@${who.split('@')[0]}, recibiste ${xp} XP`, null, { mentions: [who] }); // Corregido
};

handler.command = ['añadirxp', 'addexp'];
handler.rowner = true;

export.default handler;