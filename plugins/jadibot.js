import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
const isCommand3 = /^(bots|sockets|socket)$/i.test(command)   

async function reportError(e) {
await m.reply(`⚠️ Ocurrió un error.`)
console.log(e)
}

switch (true) {       
case isCommand1:
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
const path = `./${jadi}/${uniqid}`

if (!await fs.existsSync(path)) {
await conn.sendMessage(m.chat, { text: `🍬 Usted no tiene una sesión, puede crear una usando:\n${usedPrefix + command}\n\nSi tiene una *(ID)* puede usar para saltarse el paso anterior usando:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\`` }, { quoted: m })
return
}
if (global.conn.user.jid !== conn.user.jid) return conn.sendMessage(m.chat, {text: `✎ Use este comando al *Bot* principal.\n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0*`}, { quoted: m }) 
else {
await conn.sendMessage(m.chat, { text: `✧ Tu sesión como *Sub-Bot* se ha eliminado` }, { quoted: m })}
try {
fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, { text : `✎ Ha cerrado sesión y borrado todo rastro.` } , { quoted: m })
} catch (e) {
reportError(e)
}  
break

case isCommand2:
if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, `✎ Si no es *Sub-Bot* comuníquese al numero principal del *Bot* para ser *Sub-Bot*.`, m)
else {
await conn.reply(m.chat, `✎ ${botname} desactivada.`, m)
conn.ws.close()}  
break

case isCommand3:
//if (global.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`✎ Este comando está desactivado por mi creador.`)
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + " días, ";
}
if (horas !== 0) {
resultado += horas + " horas, ";
}
if (minutos !== 0) {
resultado += minutos + " minutos, ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}
return resultado;
}
const message = users.map((v, index) => `${index + 1}√
[🌸]+${v.user.jid.replace(/[^0-9]/g, '')}\n[💐] *Usuario*: ${v.user.name || 'Sub-Bot'}\n[🌻] *Online*: ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}`).join('\n\n\n\n');
const replyMessage = message.length === 0 ? `No hay Sub-Bots disponible por el momento, verifique mas tarde.` : message;
const totalUsers = users.length;
const responseMessage = `*╔═══❰ SUB-BOTS ACTIVOS ❱═══╗* 

 ╭ׅ ׄ𓈃〪 ְ֟፝͡  ࣳꨲ ᪬ׅ〫֔ 🌸ໍ࣭ꨲ᳟ ᪬ׅ〫ׄ ⫶⫶⫶͚  ۪͝͝  ቦ֢֔ᩙ 𓈃ᰰׅׄ 〪ׅ╮ ෮̷̸̶ᮢ⃟᭮᭯ᯩ🌸᠀ᮢ𝆬    ⎝ ¿⃔𝑄𝑢ᮬᮢ᩼𝑖𝑒ᮡ𝑟𝑒𝑠 𝑎᩼ᩬ𝑔𝑟𝑒ᮥᮤ᭳𝑔𝑎𝑟 𝑢᭯ᩬ𝑛᭫ 𝑠᳖𝑢𝑏-᳣᳝᳑𝑏𝑜ᩞᩞ𝑡 𝑎 𝑡ᩘ𝑢 𝑔᩷𝑟𝑢᳖⃑𝑝᰷𝑜⃕? ⎞
┆ ✧ Puedes solicitar permiso para que te autoricen.

 ⎝    🌨️  𝐼ُؖ𝑀͔ۖ𝑃͚̈͛𝑂̬̽𝑅ۧ𝑇̙̃ۗ𝐴̇𝑁̠۪̉𝑇̣̒ۢ۫𝐸̫̙  🌨️    ⎞ 
┆ Cada usuario de un sub-bot es responsable de su uso.
┆ El número principal no se hace responsable de un mal uso.
 ᩥ̷̸⃨᷼
 ⏝⃨֟፝︶ .     ׅ    ꪆඏ᳞ᩙ୧    ׅ      .︶⃨֟፝⏝

> 🔹 Mis Sub-Bots Online: 
: ${totalUsers || '0'}
\n\n${replyMessage.trim()}`.trim();
await _envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m})
break   
}}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesession', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']
export default handler
