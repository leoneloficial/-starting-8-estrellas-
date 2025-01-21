// *[ ❀ PLAY ]*
import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
if (!text) {
return m.reply("❀ Ingresa el texto de lo que quieres buscar")
}

let ytres = await yts(text)
let video = ytres.videos[0]
  
if (!video) {
return m.reply("❀ Video no encontrado")
}

let { title, thumbnail, timestamp, views, ago, url } = video

let vistas = parseInt(views).toLocaleString("es-ES") + " vistas"

let HS = `𔓕꯭  ꯭ 𓏲꯭֟፝੭ ꯭⌑(꯭𝐄).꯭SUMI-BOT⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭𔓕
 ▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦
❥⊰⏤͟͟͞͞Duración:⊱ ${timestamp}
❥⊰⏤͟͟͞͞Vistas:⊱ ${vistas}
❥⊰⏤͟͟͞͞Subido:⊱ ${ago}
❥⊰⏤͟͟͞͞Enlace:⊱ ${url}
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦

🌸➥𝙀𝙨𝙥𝙚𝙧𝙚 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙣𝙙𝙤 𝙨𝙪 𝙖𝙪𝙙𝙞𝙤...`

let thumb = (await conn.getFile(thumbnail))?.data;

let JT = {
contextInfo: {
externalAdReply: {
title: title, body: "",
mediaType: 1, previewType: 0,
mediaUrl: url, sourceUrl: url,
thumbnail: thumb, renderLargerThumbnail: true,
}}}

await conn.reply(m.chat, HS, m, JT)

try {
let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
let json = await api.json()
let { download } = json.result

await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg", }, { quoted: m })
} catch (error) {
console.error(error)    
}}

handler.command = /^(play)$/i

export default handler