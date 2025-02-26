let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '✧l✎ *¡Este chat no está registrado!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '✎ *¡ᯓ᮫݃͜ᮨ🌸ᢥsumiᯓᯧ no está baneado en este chat!*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '✎ *¡ᯓ᮫݃͜ᮨ🌸ᢥsumiᯓᯧ ya fué desbaneado en este chat!*', m, fake)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['unbanchat','desbanearchat','desbanchat']
handler.admin = true 
handler.botAdmin = true
handler.group = true

export default handler