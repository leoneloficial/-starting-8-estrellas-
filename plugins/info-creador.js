import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
//m.react('⚙️')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
let biografia = await conn.fetchStatus('34610246115' +'@s.whatsapp.net').catch(_ => 'Sin Biografia')
let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` +'@s.whatsapp.net').catch(_ => 'Sin Biografía')
let bio = biografia.status?.toString() || 'Sin Biografía'
let biobot = biografiaBot.status?.toString() || 'Sin Biografía'
let name = await conn.getName(who)

  await sendContactArray(conn, m.chat, [
     [`${nomorown}`, `👑creador👑`, `👑 𝕷͢𝖊𝖔፝֟፝֟፝֟፝֟፝֟፝֟𝖓𝖊𝖑 👑`, dev, correo, `MX`, `${global.yt}`, bio],
[`${conn.user.jid.split('@')[0]}`, `🌸Es Una Bot🌸`, `${packname}`, `📵 No Hacer Spam`, correo, `MX`, md, biobot]
], m)
  //m.reply(`Hola @${m.sender.split(`@`)[0]} este es el contacto de mi creador, no hagas spam!!`)
  } 

handler.help = ["creador","owner"]
handler.tags = ["info"]
handler.command = ['owner','creador']
export default handler