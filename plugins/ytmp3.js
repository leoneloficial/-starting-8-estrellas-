// *𓍯𓂃𓏧♡ YTMP3*
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)
  
try {
let api = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp3?url=${text}`)
let json = api.data

let { title, description, uploaded, duration, views, type, url, thumbnail, author, download } = json.data
let { name, url: authorUrl } = author


let HS = `- *Titulo:* ${title}
- *Autor:* ${name} - ${authorUrl}
- *Descripción:* ${description}
- *Subido:* ${uploaded}
- *Duración:* ${duration}
- *Vistas:* ${views}`

//await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: HS }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: download }, mimetype: 'audio/mpeg' }, { quoted: m })
    
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp3']

export default HS