/* ౨ৎ ˖ ࣪⊹ 𝐁𝐲 𝐉𝐭𝐱𝐬 𐙚˚.ᡣ𐭩

❀ Canal Principal ≽^•˕• ྀི≼
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

❀ Canal Rikka Takanashi Bot
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

❀ Canal StarlightsTeam
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

❀ HasumiBot FreeCodes 
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// ❀ Canal Owner Api : 
// https://whatsapp.com/channel/0029VakPf6C0bIdnzOGlMZ1K

// *𓍯𓂃𓏧♡ TIKTOK DL*
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, H✎ Ingresa un link de Tiktok`, m)
  
try {
let api = await axios.get(`https://mahiru-shiina.vercel.app/download/tiktok?url=${text}`)
let json = api.data

let { title, nickname, username, plays, likes, comments, shares, audiotitle, download } = json.data
let { video, audio } = download

let HS = `- *Titulo:* ${title}
- *Usuario:* ${nickname} - *${username}*
- *Reproducciones:* ${plays}
- *Comentarios:* ${comments}
- *Compartidos:* ${shares}
- *Audio:* ${audiotitle}`
await conn.sendMessage(m.chat, { video: { url: video }, caption: HS }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })

} catch (error) {
console.error(error)
}}

HS.command = ['tiktok', 'tiktokdl'] 

export default HS