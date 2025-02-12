
// *𓍯𓂃𓏧♡ YTMP3*

import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await axios.get(`https://api.agungny.my.id/api/youtube-audio?url=${text}`)
let json = await api.data
let { id, image, title, downloadUrl:dl_url } = json.result
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg' }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp3', 'yta']

export default HS