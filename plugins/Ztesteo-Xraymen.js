import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];
  let name = conn.getName(userId);
  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/RGury.jpg');

  let sender = m.sender.split("@")[0];
  let porcentajes = ["10%", "25%", "50%", "75%", "100%"];
  
  for (let porcentaje of porcentajes) {
    await conn.sendMessage(m.chat, { text: `Cargando... ${porcentaje}` }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 500)); // Espera de 500ms entre cada mensaje
  }

  let txt = `
һ᥆ᥣᥲ! s᥆ᥡ *${botname}*
ᥲ𝗊ᥙí 𝗍іᥱᥒᥱs ᥣᥲ ᥣіs𝗍ᥲ ძᥱ ᥴ᥆mᥲᥒძ᥆s    

`.trim();

  await conn.sendMessage(m.chat, { 
    image: { url: perfil },
    caption: txt,
    footer: 'Selecciona una opción:',
    buttons: [
      {
        buttonId: '.menu',
        buttonText: { displayText: '📜 El texto del menú' },
      },
    ],
    viewOnce: true,
    headerType: 4,
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'kkk', 'pppp'];

export default handler;