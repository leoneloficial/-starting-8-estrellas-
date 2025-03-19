async function handler(m) {
  const emojis = ['🍎', '🍒', '🍉', '🍊', '🍋', '🍏', '🍌', '🍍', '🍓', '🍇', '🍈', '🍒', '🍑', '🥭', '🍐', '🥥', '🍋‍🟩', '🌚'];
  
  for (let i = 0; i < emojis.length; i++) {
    setTimeout(async () => {
      await m.react(emojis[i]);
    }, i * 1000);
  }

  let author = m.sender || "Unknown";

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
URL:https://www.atom.bio/edar_
NOTE:xd.
BDAY:2025-12-31
PHOTO;VALUE=URI:https://mystickermania.com/cdn/stickers/cute/mochi-peach-cat-bread-512x512.png
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

handler.customPrefix = /^(Edar|edar|@50492280729|\.owner|owner|\.dueño|dueño|\.creador|creador)$/i;
handler.command = /^(Edar|edar|@50492280729|\.owner|owner|\.dueño|dueño|\.creador|creador)$/i;

export default handler;