import JavaScriptObfuscator from 'javascript-obfuscator'

var handler = async(m, { conn, text }) => {
let loadd = [
 '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
 '《████▒▒▒▒▒▒▒▒▒》30%',
 '《███████▒▒▒▒▒▒》50%',
 '《██████████▒▒▒》70%',
 '《█████████████》100%',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_Loading_'})
if (!text) return m.reply(`*\`🌹 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙴𝙻 𝙲𝙾𝙳𝙸𝙶𝙾 𝚀𝚄𝙴 𝚅𝙰𝚂 𝙰 𝙾𝙵𝚄𝚂𝙲𝙰𝚁 ?\`*`) 
function obfuscateCode(code) {
  return JavaScriptObfuscator.obfuscate(code, { compact: false, controlFlowFlattening: true, deadCodeInjection: true, simplify: true, numbersToExpressions: true }).getObfuscatedCode();
}
let obfuscatedCode = await obfuscateCode(text);
conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
}
handler.command = /^(ofuscar|ofuscador)$/i
export default handler
