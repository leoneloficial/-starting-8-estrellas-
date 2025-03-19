const handler = async (m, {conn, usedPrefix}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A' || usedPrefix == '*' || usedPrefix == '#') return;
  if (!db.data.chats[m.chat].audios) return;
  if (!db.data.settings[conn.user.jid].audios_bot && !m.isGroup) return;
  //const s = seconds: '1934.4'
  let vn = 'https://qu.ax/Yigyp.mp3'
  conn.sendPresenceUpdate('recording', m.chat);
  conn.sendMessage(m.chat, {audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName:, {quoted: m});
};
handler.command = ['pique']
handler.rowner = true;
export default handler;