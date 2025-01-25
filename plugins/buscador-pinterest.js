// *[ ❀ PINTEREST (search) ]*
import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieres buscar en pinterest`, m)
  
try {
let api = await fetch(`https://bk9.fun/pinterest/search?q=${text}`)
let json = await api.json()
if (!json || !json.BK9 || !json.BK9.length) return conn.reply(m.chat, `✧ No se encontraron resultados para ${text}.`, m)
let randomRes = json.BK9[Math.floor(Math.random() * json.BK9.length)]
    
let HS = `- *Titulo :* ${randomRes.grid_title || '-'}
- *Creador :* ${randomRes.username || '-'}
- *Publicado :* ${randomRes.created_at}
- *Link :* ${randomRes.pin}`
await conn.sendMessage(m.chat, { image: { url: randomRes.images_url }, caption: HS }, { quoted: m })

} catch (error) {
console.error(error)
}}


HS.command = ['pinterest']

export default HS