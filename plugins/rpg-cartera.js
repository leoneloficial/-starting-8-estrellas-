let handler = async (m, {conn, usedPrefix}) => {
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
if (who == conn.user.jid) return error 
if (!(who in global.db.data.users)) return conn.reply(m.chat, '✧ El usuario no se encuentra en mi base de Datos.', m, fake)
let user = global.db.data.users[who]
await m.reply(`${who == m.sender ? `Tienes *${user.coin} ${moneda} ⛀* en tu Cartera` : `El usuario @${who.split('@')[0]} tiene *${user.coin} ${moneda} ⛀* en su Cartera`}. `, null, { mentions: [who] })}

handler.help = ['wallet']
handler.tags = ['economy']
handler.command = ['wallet', 'cartera', 'yenes', 'bal', 'coins']
handler.register = true 
export default handler
