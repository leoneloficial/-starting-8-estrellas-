import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
  let bot = global.db.data.settings[conn.user.jid]
  let _uptime = process.uptime() * 1000
  let uptime = (_uptime).toTimeString()
  let totalreg = Object.keys(global.db.data.users).length
  let totalchats = Object.keys(global.db.data.chats).length
  let totalf = Object.values(global.plugins).filter(v => v.help && v.tags).length
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
  const used = process.memoryUsage()

  let timestamp = speed()
  let latensi = speed() - timestamp

 
  var git = 'https://github.com/Leoneloficial'
  var github = 'https://github.com/Leoneloficial/-Starting-8-estrellas-' 
  let correo = 'Leoneloficial.com'

  let yuki = `╭─⬣「 *Info De ${botname}* 」⬣\n`
  yuki += `│ 「 ❃*˚｡⋆」 *Creador* : @${owner[0][0].split('@s.whatsapp.net')[0]}\n`
  yuki += `│ 「 ೃ♥︎•୭」 *Prefijo* : [ ${usedPrefix} ]\n`
  yuki += `│ 「 ∫ *✰* *.۰」 *Total Plugins* : ${totalf}\n`
  yuki += `│ 「 ࿔* 𖤓*:･ﾟ」 *Plataforma* : ${platform()}\n`
  yuki += `│ 「༉₊ ✦*˚」 *Servidor* : ${hostname()}\n`
  yuki += `│ 「 ❃*˚｡⋆」 *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n`
  yuki += `│  「༊ ❆·˚」 *FreeRAM* : ${format(freemem())}\n`
  yuki += `│ 「⋰˚❁」 *Speed* : ${latensi.toFixed(4)} ms\n`
  yuki += `│ 「୭̥° *❀⋰˚」 *Uptime* : ${uptime}\n`
  yuki += `│ 「₊˚✿*.༄」 *Grupos Registrados* : ${groupsIn.length}\n`
  yuki += `│ 「‧₊˚ ✧* 彡」 *Chats Totales* : ${chats.length}\n`
  yuki += `╰─⬣\n\n`
  
  yuki += `╭─⬣「 *Redes del Creador* 」⬣\n`
  yuki += `│ 「 ೃ♥︎•୭」 *GitHub Personal* : ${git}\n`
  yuki += `│ 「 ࿔* *𖤓:･ﾟ」 *Repositorio Bot* : ${github}\n`
  yuki += `│ 「 ∫ *✰ *.۰」 *Correo* : ${correo}\n`
  yuki += `╰─⬣\n\n`

  yuki += `╭─⬣「 *NodeJS Uso de memoria* 」⬣\n`
  yuki += `${'```' + Object.keys(used).map((key) => `${key}: ${format(used[key])}`).join('\n') + '```'}\n`
  yuki += `╰─⬣`

  await conn.reply(m.chat, yuki, fkontak, { 
    contextInfo: { 
      mentionedJid: [owner[0][0] + '@s.whatsapp.net'], 
      externalAdReply: { 
        mediaUrl: false, 
        mediaType: 1, 
        description: false, 
        title: packname, 
        body: dev, 
        previewType: 0, 
        thumbnail: icons, 
        sourceUrl: redes
      }
    }
  })
}

handler.help = ['infobot']
handler.tags = ['info']
handler.command = ['info', 'infobot']

export default handler