import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
    m.react('👑')

    let bio1 = await conn.fetchStatus('584164137403@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bio2 = await conn.fetchStatus('50558124470@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bioBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía')

    let imgUrl = 'https://qu.ax/oqCij.jpg' // Imagen de presentación

    // Creamos un "contacto falso" con la imagen como foto de perfil
    await sendContactArray(conn, m.chat, [
        ['00000001', '🌸 𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 🌸', '𝗘𝘀𝗲 𝗹𝗮 𝗕𝗼𝘁', '📌 Presentación', 'imgUrl', '🌍 WhatsApp', 'https://github.com', '📸 Imagen de presentación'],
        [`${conn.user.jid.split('@')[0]}`, '🌸Ese la Bot🌸', 'Bot Oficial', '📵 No Hacer Spam', 'correo@example.com', 'MX', 'https://github.com', bioBot.status?.toString() || 'Sin Biografía'],
        ['584164137403', '👑 Staff creador', '👑 Leonel', 'Desarrollador', 'omanaleonel04@gmail.com', 'MX', 'https://youtube.com/', bio1.status?.toString() || 'Sin Biografía'],
        ['50558124470', '💻 Staff zahpkiel', 'ⁱᵃᵐzahpkiel𒆜 Sss+', 'Soporte Técnico', 'enderjosueasevedotorrez@gmail.com', 'NI', 'https://github.com/EnderJs-CreatorGL', bio2.status?.toString() || 'Sin Biografía'],
    ], m)
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador']
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
    let contacts = []
    for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
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
item3.X-ABLabel: 🌍 Ubicación
item4.URL:${isi4}
item4.X-ABLabel:Website
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