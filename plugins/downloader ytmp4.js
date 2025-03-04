/* 
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