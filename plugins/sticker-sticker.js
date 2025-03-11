import { sticker } from '../lib/sticker.js'
import moment from 'moment-timezone'

let handler = async (m, { conn, args, usedPrefix, command }) => {

let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return m.reply(`☁️ *¡El video no puede durar mas de 8 segundos!*`)
let img = await q.download?.()

if (!img) return conn.reply(m.chat, `《♥︎》 *Por favor, envía una imagen o video para hacer un sticker.*`, m,)

let out
try {
stiker = await sticker(img, false, global.packsticker, `━━━━━━━━━♾
\🌸𝙨𝙪𝙢𝙞 𝙨𝙖𝙠𝙪𝙧𝙖𝙯𝙖𝙬𝙖🌸
✎sticker creado por
     ︾
\n${m.pushName}\n
⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}\n\n\nѕτιϲκєя ϐγ: Starting
.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.`)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packsticker, `━━━━━━━━♾\вσт мαƒια\n${m.pushName}\n⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')} \n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\nѕτιϲκєя ϐγ: Starting`)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packsticker, `━━━━━━━━♾\🌸𝙨𝙪𝙢𝙞 𝙨𝙖𝙠𝙪𝙧𝙖𝙯𝙖𝙬𝙖🌸\n${m.pushName}\n⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')} \n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\nѕτιϲκєя ϐγ: Starting`)

else return m.reply(`💫 El url es incorrecto`)

}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: packname, body: `hola`, mediaType: 2, sourceUrl: redes, thumbnail: icons}}}, { quoted: m })

else return conn.reply(m.chat, '《♥︎》 *Por favor, envía una imagen o video para hacer un sticker.*', m, )


}}
handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.group = false;
handler.register = true
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
