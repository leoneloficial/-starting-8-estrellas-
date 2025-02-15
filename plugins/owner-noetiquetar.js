let handler = async (m, {conn, text}) => {
  let name = await conn.getName(m.sender);

conn.reply(m.chat, `> [ 💖 ️] No etiquetes a mi owner, si es algo urgente contacta con el a su chat privado para mas informacion` ,m, { contextInfo:{ externalAdReply: {title: '❤️‍🔥 Starting 8 estrellas', body: 'ᴇsᴄʀɪʙɪʀʟᴇ ᴀᴘʟᴀsᴛᴀɴᴛᴏ ᴀǫᴜɪ', sourceUrl: 'https://wa.me/584164137403'}}})
}
handler.customPrefix = /@584164137403/i;
handler.command = new RegExp();

export default handler;