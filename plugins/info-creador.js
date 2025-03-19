async function handler(m, { conn }) {
  const emojis = ['🍎'];

  // Reacciones en secuencia
  await Promise.all(emojis.map((emoji, i) => new Promise(resolve => {
    setTimeout(async () => {
      await m.react(emoji);
      resolve();
    }, i * 1000);
  })));

  let wm = "Izumi-Bot"; 
  let imagen4 = "https://mystickermania.com/cdn/stickers/cute/mochi-peach-cat-bread-512x512.png"; 
  let canal = "https://www.atom.bio/edar_";  

  let author = m.pushName || "Usuario Desconocido";

  await conn.sendMessage(m.chat, {
    contacts: {
      contacts: [
        {
          displayName: "Leonel OFC",
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Leonel;;;
FN:Leonel OFC
ORG:sumi-Bot Owner
TITLE: Developer
TEL;type=CELL;type=VOICE;waid=584164137403:+58 416-4137403
TEL;type=WORK;type=VOICE:+58 416-4137403
EMAIL: izumilitee@gmail.com
ADR;type=WORK:;;Por el día no hago nada;;;;
URL:${canal}
NOTE:Å,
BDAY:2025-12-31
PHOTO;VALUE=URI:${imagen4}
END:VCARD`
        },
        {
          displayName: "Edar",
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Edar;;;
FN:Edar
ORG:Izumi-Bot Owner
TITLE: Developer
TEL;type=CELL;type=VOICE;waid=50558124470:+505 5812-4470
TEL;type=WORK;type=VOICE:+505 5812-4470
EMAIL: izumilitee@gmail.com
ADR;type=WORK:;;Por el día no hago nada;;;;
URL:${canal}
NOTE:xd.
BDAY:2025-12-31
PHOTO;VALUE=URI:${imagen4}
END:VCARD`
        }
      ]
    },
    contextInfo: {
      externalAdReply: {
        renderLargerThumbnail: true,
        mediaType: 1,
        title: '🪄Somos el Staff🪄',
        body: wm,
        thumbnail: imagen4,
        sourceUrl: canal
      }
    }
  }, { quoted: m });
}

handler.command = /^(Edar|edar|@50558124470|\.owner|owner|\.dueño|dueño|\.creador|creador)$/i;

export default handler;