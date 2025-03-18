import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('👑')

  let bio1 = await conn.fetchStatus('584164137403@s.whatsapp.net').catch(_ => 'Sin Biografía')
  let bio2 = await conn.fetchStatus('50558124470@s.whatsapp.net').catch(_ => 'Sin Biografía')
  let bioBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía')

  await sendContactArray(conn, m.chat, [
      ['50584972454', '🌸 Ese la Bot 🌸', 'Bot Oficial', '📵 No Hacer Spam', 'correo@example.com', 'MX', 'https://github.com', bioBot.status?.toString() || 'Sin Biografía', 'https://qu.ax/oqCij.jpg'],
      ['584164137403', '👑 Staff creador', '👑 Leonel 👑', 'Desarrollador', 'omanaleonel04@gmail.com', 'MX', 'https://youtube.com/', bio1.status?.toString() || 'Sin Biografía'],
      ['50558124470', '💻 Staff zahpkiel', 'ⁱᵃᵐzahpkiel𒆜 Sss+', 'Soporte Técnico', 'enderjosueasevedotorrez@gmail.com', 'NI', 'https://github.com/EnderJs-CreatorGL', bio2.status?.toString() || 'Sin Biografía']
  ], m)
} 

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador']
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
    let contacts = []
    for (let [number, name, org, role, email, location, website, bio, img] of data) {
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
ORG:${org}
TITLE:${role}
TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL;type=INTERNET:${email}
ADR:;;${location};;;;
URL:${website}
NOTE:${bio}
PHOTO;TYPE=JPEG;VALUE=URI:${img || ''}
END:VCARD`.trim()

        contacts.push({ vcard, displayName: name })
    }
    return await conn.sendMessage(jid, {
        contacts: {
            displayName: contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName,
            contacts,
        }
    }, { quoted, ...options })
}