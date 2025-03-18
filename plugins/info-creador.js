import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
    m.react('👑')
    let bio1 = await conn.fetchStatus('584164137403@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bio2 = await conn.fetchStatus('50558124470@s.whatsapp.net').catch(_ => 'Sin Biografía')
    let bioBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía')

    let contacts = [
        ['584164137403', '👑 Staff creador', '👑 𝕷͢𝖊𝖔𝖓𝖊𝖑 👑', 'Desarrollador', 'omanaleonel04@gmail.com', 'MX', 'https://youtube.com/', bio1.status?.toString() || 'Sin Biografía'],
        ['50558124470', '💻 Staff zahpkiel', 'ⁱᵃᵐzahpkiel𒆜', 'Soporte Técnico', 'enderjosueasevedotorrez@gmail.com', 'NI', 'https://github.com/EnderJs-CreatorGL', bio2.status?.toString() || 'Sin Biografía'],
        [`${conn.user.jid.split('@')[0]}`, '🌸Ese la Bot🌸', 'Bot Oficial', '📵 No Hacer Spam', 'correo@example.com', 'MX', 'https://github.com', bioBot.status?.toString() || 'Sin Biografía']
    ]

    await sendContactArray(conn, m.chat, contacts, m)

    // Agregamos la imagen como un mensaje aparte
    await conn.sendMessage(m.chat, { image: { url: 'https://qu.ax/oqCij.jpg' }, caption: 'Foto de contacto' }, { quoted: m })
}

handler.help = ["creador", "owner"]
handler.tags = ["info"]
handler.command = ['owner', 'creador']
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
    let contacts = []
    for (let [number, name, org, role, email, location, website, bio] of data) {
        number = number.replace(/[^0-9]/g, '')
        let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${org}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${role}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:📧 Email
item3.ADR:;;${location};;;;
item3.X-ABADR:ac
item3.X-ABLabel: 🌍 Ubicación
item4.URL:${website}
item4.X-ABLabel:Website
item5.X-ABLabel:${bio}
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