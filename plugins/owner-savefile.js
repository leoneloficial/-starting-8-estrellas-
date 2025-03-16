import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}
if (!text) return m.reply(`✎ Ingresa la Ruta y el nombre del Archivo junto al comando.`)
try {
if (!m.quoted.text) return m.reply(`Responde al mensaje.`)
let path = `${text}.js`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`🍭 Guardado en *${path}*.`)
} catch {
await m.reply(`Responde al mensaje.`)
}}
handler.tags = ['owner']
handler.help = ["savefile <ruta/nombre>"]
handler.command = ["savefile", "savejs", "savecmd"]

handler.rowner = true
export default handler