// *𓍯𓂃𓏧♡ YTMP4*

import fetch from "node-fetch";

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)
try {
let api = await (await fetch(`https://api.lyrax.net/api/dl/ytdl?url=${text}&apikey=Tesis`)).json()

await conn.sendMessage(m.chat, { video: { url: json.data.file_url }, json.data.title: `${json.data.title}.mp4`, mimetype: 'video/mp4', caption: `` }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp4', 'ytv']

export default HS