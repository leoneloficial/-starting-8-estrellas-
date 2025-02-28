import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {

  let staff = `
*EQUIPO STAFF OWNERS DEL BOT* 


👑 *Dueño* ${creador}
🍬 *Bot:* ${botname}
⚜️ *Versión:* ${vs}
📚 *Libreria:* ${libreria} ${baileys}

🪐 *Creador:*

☁️ ৎ୭࠭͢𓆩𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑𓆪͟͞ '
🔖 *Rol:* Creador
👾 *GitHub:* 

🌻 *STAFF SOPORTE DEL BOT:*

✴️ Zaphkiel
🔖 *Rol:* Developer
👾 *GitHub:https://github.com/EnderJs-CreatorGL

🍍 
🔖 *Rol:* Developer
👾 *Github:*

⚡ 
🔖 *Rol:* Developer
👾 *GitHub:*

☘️ 
🔖 *Rol:* Developer
👾 *GitHub:*


🔖 *Rol:* Moderador 
👾 *GitHub:* `.trim();

  await conn.sendMessage(m.chat, { 
      text: staff,
      contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: `✨ Developers`,
              body: dev,
              thumbnailUrl: catalogo,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });

};

handler.help = ['staff'];
handler.tags = ['main'];
handler.command = ['ayudantes', 'colaboradores', 'staff'];

export default handler;
