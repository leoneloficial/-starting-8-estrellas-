import fs from 'fs'

if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
await m.reply(`❮✦❯ » *Enviando base de datos de ${wm}...*`)
try {
await m.react(rwait)
let d = new Date
let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
let database = await fs.readFileSync(`./src/database/database.json`)
let creds = await fs.readFileSync(`./Sessions/creds.json`)
await conn.reply(m.chat, `*• Fecha:* ${date}`, m)
await conn.sendMessage(m.sender, {document: database, mimetype: 'application/json', fileName: `database.json`}, { quoted: fkontak })
await m.react(done)
await conn.sendMessage(m.sender, {document: creds, mimetype: 'application/json', fileName: `creds.json`}, { quoted: fkontak })
await m.react(done)
} catch {
await m.react(error)
conn.reply(m.chat, `⚠️ *Ocurrió un error.*`, m, fake)}}

handler.help = ['copia']
handler.tags = ['owner']
handler.command = ['backup', 'respaldo', 'copia']
handler.rowner = true

export default handler
