async function handler(m, { conn }) {
  const emojis = ['🍎', '🍒', '🍉', '🍊', '🍋', '🍏', '🍌', '🍍', '🍓', '🍇', '🍈', '🍒', '🍑', '🥭', '🍐', '🥥', '🍋‍🟩', '🌚'];

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
      contacts: [{
        displayName: author,
        vcard: `BEGIN:VCARD
VERSION:3.0
N:Edar;;;
FN:ᯓ᮫݃͜ᮨ🍁ܾ݉ᢥ౽꯭ⲉυ꯭᥉′🦦ꪃꒉܻᵃₚͬ៰⍳
ORG:Izumi-Bot Owner
TITLE: Developer
TEL;type=CELL;type=VOICE;waid=50492280729:+504 9228 0727
TEL;type=WORK;type=VOICE:+504 9228 0729
EMAIL: izumilitee@gmail.com
ADR;type=WORK:;;Por el dia no hago nada y por la tarde descanso;;;;
URL:${canal}
NOTE:xd.
BDAY:2025-12-31
PHOTO;VALUE=URI:${imagen4}
END:VCARD`
      }]
    },
    contextInfo: {
      externalAdReply: {
        renderLargerThumbnail: true,
        mediaType: 1,
        title: 'No molestar, xD -_-',
        body: wm,
        thumbnail: imagen4,
        sourceUrl: canal
      }
    }
  }, { quoted: m });
}


handler.command = /^(Edar|edar|@50492280729|\.owner|owner|\.dueño|dueño|\.creador|creador)$/i;

export default handler;