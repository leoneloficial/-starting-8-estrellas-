let handler = async (m, {conn, text}) => {
  let name = await conn.getName(m.sender);

conn.reply(m.chat, `*[ 💖 ️] No etiquetes a mi owner, si es algo urgente contacta con el a su chat privado para mas informacion*` ,m, { contextInfo:{ externalAdReply: {title: '❤️‍🔥 sumi sakurazawa', body: 'ᴇsᴄʀɪʙɪʀʟᴇ ᴀᴘʟᴀsᴛᴀɴᴛᴏ ᴀǫᴜɪ', sourceUrl: 'https://wa.me/584164137403'}}})
}
handler.customPrefix = /@50558124470/i;
handler.command = new RegExp();

export default handler;