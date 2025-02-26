import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🥞 Ingresa el texto de lo que quieres buscar en pixaiart.', m)
try {
let api = await fetch(`https://delirius-apiofc.vercel.app/search/pixaiart?query=${encodeURIComponent(text)}`)
let json = await api.json()
if (!json.data || json.data.length === 0) return conn.reply(m.chat, '🥞 No se encontraron imágenes.', m)

async function createImage(url) {
let { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
return imageMessage
}

let push = []
for (let item of json.data.slice(0, 9)) {
let image = await createImage(item.image)
push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: `◦ *Título:* ${item.title || 'Sin título'}\n◦ *Autor:* ${item.name}` }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
header: proto.Message.InteractiveMessage.Header.fromObject({ title: '', hasMediaAttachment: true, imageMessage: image }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [{ "name": "cta_url", "buttonParamsJson": `{"display_text":"🌐 Ver Imagen","url":"${item.image}"}` }] })
})
}

const msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage: proto.Message.InteractiveMessage.fromObject({ body: proto.Message.InteractiveMessage.Body.create({ text: `🔎 *Resultados de:* ${text}` }), footer: proto.Message.InteractiveMessage.Footer.create({ text: '🥞 Imágenes pixaiart' }), header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }), carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }) }) } } }, { quoted: m })

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch {}
}
handler.help = ['pixaiart *<texto>*']
handler.tags = ['search']
handler.command = /^(pixaiart)$/i
export default handler