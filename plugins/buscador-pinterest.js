/*// *[ ❀ PINTEREST SEARCH ]*
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieras buscar`, m)


try {
let api = await axios.get(`https://restapi.apibotwa.biz.id/api/search-pinterest?message=${text}`)
let json = api.data

await conn.sendFile(m.chat, json.data.response, 'HasumiBotFreeCodes.jpg', `❀ Resultado de : *${text}*`, m)

} catch (error) {
console.error(error)    
}}    

handler.command = ['pinterest', 'pinterestsearch']

export default handler