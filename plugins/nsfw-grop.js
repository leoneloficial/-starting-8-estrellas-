//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('✎ El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw*');
    }
    
    let who;
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('😏');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *está manoseando a* \`${name || who}\` *estas muy excitante hoy.*`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está manoseando a* \`${name || who}\` *estás muy sensual hoy.`;
    } else {
        str = `\`${name2}\` *está manoseando! >.<*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/RdBAy.mp4'; 
        let pp2 = 'https://qu.ax/DolnW.mp4'; 
        let pp3 = 'https://qu.ax/OydCh.mp4';
        let pp4 = 'https://qu.ax/CDrZm.mp4';
        let pp5 = 'https://qu.ax/BRmBk.mp4';
        let pp6 = 'https://qu.ax/AFzqg.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['grop/manosear @tag'];
handler.tags = ['emox'];
handler.command = ['grop', 'grope', 'manosear'];
handler.group = true;

export default handler;