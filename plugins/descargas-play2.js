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

// *𓍯𓂃𓏧♡ YTMP4*

import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await axios.get(`https://api.agungny.my.id/api/youtube-video?url=${text}`)
let json = await api.data
let { id, image, title, downloadUrl:dl_url } = json.result
await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `` }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp4', 'yta']

export default HS