import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
['393715279301', 'ⁱᵃᵐ|LeonelOFC𒆜', true],
['59169739411'],
['559296077349','Undefined',true],
['50558124470', 'zaphkiel',true],
['5218211111111', 'Papi Chulo',true]
];

global.ownersDisabled = false; // Establece si los comandos de owners están desactivados

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = ['559296077349', '50558124470']
global.suittag = ['393715279301']
global.prems = ['559296077349']

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.9' 
global.vs = '2.1.5'
global.nameqr = 'Sumi-Zakurasawa'
global.namebot = '✿◟Sumi-Zakurasawa◞✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.sumiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packsticker =`┊🌸Chanel♥︎star‘tin
     ╰https://Sumi.online 
┊🍁Info:
╰➣https://channel Sumi.likes`
global.packsticker2 = `━━━━━━━━━♾\
вσт мαƒια\nৎ୭࠭͢𓆩𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑𓆪͟͞ \n⇝ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n⇝ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')} \n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\nѕτιϲκєя ϐγ: Starting`

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = `🌸ܾ݉𝘚𝗎ࣼｍ͑͡i ٞ 𝘚َٙ͜ɑ𝚔𝗎͡𝔯ɑ𝘇゙ɑ͜𝑤ɑ🌸◞˚ₓ`
global.botname = '🌸ܾ݉𝘚𝗎ࣼｍ͑͡i ٞ 𝘚َٙ͜ɑ𝚔𝗎͡𝔯ɑ𝘇゙ɑ͜𝑤ɑ🌸'
global.wm = '🌸sumi sakurazawa🌸 • starting team '
global.author = 'Made By ৎ୭࠭͢𓆩𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑𓆪͟͞ '
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ৎ୭࠭͢𓆩𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑𓆪͟͞  '
global.textbot = '🌸sumi sakurazawa🌸 • Powered By ৎ୭࠭͢𓆩𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑𓆪͟͞ '

global.moneda = 'coin'
global.welcom1 = 'Edita Con #setwelcome'
global.welcom2 = 'Edita Con #setbye'
global.banner = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1743215479429.jpeg'
global.avatar = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1743215491726.jpeg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.imagen1 = fs.readFileSync('./src/menus/Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/anime.jpg');
global.imagen3 = fs.readFileSync('./src/menus/Menu3.jpg');
global.imagen4 = fs.readFileSync('./src/menus/Menu.jpg');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./src/menus/Menu3.jpg');
global.imagen7 = fs.readFileSync('./src/menus/Menu5.jpg');
global.imagen8 = fs.readFileSync('./src/menus/Menu4.jpg')
global.imagen9 = fs.readFileSync('./src/menu_en.png')
global.imagen10 = fs.readFileSync('./src/nuevobot.jpg')
global.miniurl = fs.readFileSync('./src/Grupo.jpg');
global.logo2 = fs.readFileSync('./src/logo2.jpg')
global.logo3 = fs.readFileSync('./src/logo3.jpg')
global.catalogo = fs.readFileSync('./src/logo6.png')
global.logo4 = fs.readFileSync('./src/logo4.jpg')
global.logo5 = fs.readFileSync('./src/logo5.jpg')
global.logo7 = fs.readFileSync('./src/Logo7.png')
global.logo8 = fs.readFileSync('./src/Logo8.jpg')
global.rule = fs.readFileSync('./src/rule.jpg')
global.photoSity = [imagen8, imagen1, imagen4, imagen6]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp4 = 'https://chat.whatsapp.com/G6knC0f7kCZIG39iTZOTJw'
global.gp1 = 'https://chat.whatsapp.com/G6knC0f7kCZIG39iTZOTJw' 
global.gp2 = 'https://chat.whatsapp.com/G6knC0f7kCZIG39iTZOTJw'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w'
global.channel = 'https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w'
global.channel2 = 'https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w'
global.md = 'https://github.com/leoneloficial/-starting-8-estrellas-'
global.correo = 'enderjosueasevedotorrez@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '❀ Sumi-Bot-MD☄︎︎', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.ch = {
ch1: '120363324350463849@newsletter',
ch2: '120363324350463849@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
