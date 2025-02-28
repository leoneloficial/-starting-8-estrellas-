/* Código adaptado por EnderJs Zaphkiel */

import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('🌟')

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://files.catbox.moe/3kbbok.jpg')

  let biografia1 = await conn.fetchStatus('584164137403@s.whatsapp.net').catch(_ => ({ status: 'Sin Biografía' }))
  let biografia2 = await conn.fetchStatus('50558124470@s.whatsapp.net').catch(_ => ({ status: 'Sin Biografía' }))
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => ({ status: 'Sin Biografía' }))

  let bio1 = biografia1.status?.toString() || 'Sin Biografía'
  let bio2 = biografia2.status?.toString() || 'Sin Biografía'
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía'

  let nomorown1 = '584164137403'
  let nomorown2 = '50558124470'

  await sendContactArray(conn, m.chat, [
    [`${nomorown1}`, `💻 Equipo Staff`, `☁️Leonel𒆜`, `🎶 Owner Supremo`, bio1],
    [`${nomorown2}`, `💻 Staff Zahpkiel`, `☁️zahpkiel𒆜`, `🎶 Owner Support`, bio2],
    [`${conn.user.jid.split('@')[0]}`, `🎶 Numero bot`, `Bot Oficial`, `📍 Soy tu sanadora`, `https://github.com/leoneloficial/-starting-8-estrellas-`, biobot]
  ], m)
}

handler.help = ['staff']
handler.tags = ['main']
handler.command = ['ayudantes', 'colaboradores', 'staff']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]

  let contacts = []
  for (let [number, name, role, role2, bio, website, extra] of data) {
    number = number.replace(/[^0-9]/g, '')
    let njid = number + '@s.whatsapp.net'
    let biz = await conn.getBusinessProfile?.(njid).catch(_ => null) || {}

    let pn = new PhoneNumber(`+${number}`)
    let internationalNumber = pn.getNumber('international') || `+${number}`

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${role}
item1.TEL;waid=${number}:${internationalNumber}
item1.X-ABLabel:${role2}
item2.EMAIL;type=INTERNET:info@example.com
item2.X-ABLabel:📧 Email
item3.ADR:;;${bio};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Región
item4.URL:${website}
item4.X-ABLabel:Website
item5.X-ABLabel:${extra}
END:VCARD`.trim()

    contacts.push({ vcard, displayName: name })
  }

  try {
    return await conn.sendMessage(jid, {
      contacts: {
        displayName: contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName,
        contacts,
      }
    }, { quoted, ...options })
  } catch (error) {
    console.error("Error al enviar contactos:", error)
  }
}