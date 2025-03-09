import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para buscar en pinterest`, m)

try {
let api = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${text}`)
let json = api.data
let data = json.data[Math.floor(Math.random() * json.data.length)]

let { pin, created_at, images_url, grid_title } = data
let HS = `- *Titulo :* ${grid_title}
- *Creado :* ${created_at}
- *link :* ${pin}`
await conn.sendMessage(m.chat, { image: { url: images_url }, caption: HS }, { quoted: m })
//await conn.sendMessage(m.chat, { image: images_url, caption: HS, footer: '', buttons: [ { buttonId: `.pinterest ${text}`, buttonText: { displayText: 'Siguiente' } }, ], viewOnce: true, headerType: 4 }, { quoted: m })

} catch (error) {
console.error(error)
}}

HS.command = ['pinterest', 'pinterestsearch']

export default HS