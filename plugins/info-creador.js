import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  m.react('☁️')  // Reacción con el emoji de la nube
  
  // Determinamos quién es el destinatario o el remitente si no se menciona a nadie.
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  
  // Obtenemos la foto de perfil del usuario o bot
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://files.catbox.moe/3kbbok.jpg')
  
  // Obtenemos la biografía del propietario
  let biografia = await conn.fetchStatus('584120346669' + '@s.whatsapp.net').catch(_ => 'Sin Biografía')
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` + '@s.whatsapp.net').catch(_ => 'Sin Biografía')
  
  // Si la biografía está disponible, la asignamos, de lo contrario, la ponemos como 'Sin Biografía'
  let bio = biografia.status?.toString() || 'Sin Biografía'
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía'
  
  // Obtenemos el nombre del destinatario o remitente
  let name = await conn.getName(who)

  // Verificamos que el número de propietario esté bien definido
  let nomorown = '584120346669'  // Cambia esto al número correcto de tu propietario si es necesario

  // Enviamos los contactos con la información solicitada
  await sendContactArray(conn, m.chat, [
    [`${nomorown}`, `👑 Propietario`, `☁️ ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜`, 'thekingdestroy507@gmail.com', `🇻🇪 Venezuela`, `https://github.com/The-King-Destroy`, bio],
    [`${conn.user.jid.split('@')[0]}`, `Es Un Bot 🍬`, `${packname}`, `📵 No Hacer Spam`, 'moisesmusic04@gmail.com', `🇨🇴 Colombia`, `https://github.com/The-King-Destroy/Yuki_Suou-Bot`, biobot]
  ], m)
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['creador', 'owner']
export default handler

// Función para enviar los contactos en el formato adecuado
async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  
  let contacts = []
  for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
    number = number.replace(/[^0-9]/g, '')
    let njid = number + '@s.whatsapp.net'
    let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
    
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()

    contacts.push({ vcard, displayName: name })
  }
  
  try {
    return await conn.sendMessage(jid, {
      contacts: {
        displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
        contacts,
      }
    }, {
      quoted,
      ...options
    })
  } catch (error) {
    console.error("Error al enviar contactos:", error)
  }
}