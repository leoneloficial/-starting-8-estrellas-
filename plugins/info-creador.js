let handler = async (m, { conn, text, usedPrefix, command }) => {
async function handler(m, { conn }) {
  const emojis = ['🪄'];

  // Reacciones en secuencia
  for (const [i, emoji] of emojis.entries()) {
    setTimeout(async () => {
      await m.react(emoji);
    }, i * 1000);
  }

  let wm = "sumi-Bot";
  let canal = "https://chat.whatsapp.com/FPBTBBt8la6Bcn8eECF9vg";
  let author = m.pushName || "Usuario Desconocido";

  // Obtener la foto de perfil del usuario
  let imagen4;
  try {
    imagen4 = await conn.profilePictureUrl(m.sender);
  } catch (e) {
    imagen4 = "https://qu.ax/iwyKl.jpg"; // Imagen por defecto
  }

  await conn.sendMessage(m.chat, {
    contacts: {
      contacts: [{
        displayName: author,
        vcard: `BEGIN:VCARD
VERSION:3.0
N:Leonel;;;
FN:Leonel OFC
ORG:sumi-Bot Owner
TITLE:Developer
TEL;type=CELL;type=VOICE;waid=584164137403:+58 416-4137403
TEL;type=WORK;type=VOICE:+58 416-4137403
EMAIL:izumilitee@gmail.com
ADR;type=WORK:;;Por el día no hago nada;;;;
URL:${canal}
BDAY:2025-12-31
PHOTO;VALUE=URI:${imagen4}
END:VCARD`
      }]
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

handler.command = /^(contactos|\.owner|owner|\.dueño|\.creador|creador)$/i;

export default handler;