import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('☁️');
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://files.catbox.moe/3kbbok.jpg');
  let biografia = await conn.fetchStatus('584120346669' + '@s.whatsapp.net').catch(_ => 'Sin Biografía');
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` + '@s.whatsapp.net').catch(_ => 'Sin Biografía');
  let bio = biografia.status?.toString() || 'Sin Biografía';
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía';
  let name = await conn.getName(who);

  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `👑 Propietario`, `☁️ ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜`, dev, 'thekingdestroy507@gmail.com', `🇻🇪 Venezuela`, `https://github.com/The-King-Destroy`, bio],
    [`${conn.user.jid.split('@')[0]}`, `Es Un Bot 🍬`, `${packname}`, `📵 No Hacer Spam`, 'moisesmusic04@gmail.com', `🇨🇴 Colombia`, `https://github.com/The-King-Destroy/Yuki_Suou-Bot`, biobot]
  ], m);
};

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['creador', 'owner'];
export default handler;

