import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
    try {
        options ? options : {}
        var res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'User-Agent': 'GoogleBot',
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}

// Cargar base de datos y filtrar enlaces vacíos
const category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))

const validLinks = db_.links[category].filter(link => link.trim() !== "")

if (validLinks.length === 0) {
    console.error("No hay enlaces válidos en la categoría:", category)
} else {
    const random = Math.floor(Math.random() * validLinks.length)
    const randomlink = validLinks[random]

    try {
        const response = await fetch(randomlink)
        const rimg = await response.buffer()
        global.icons = rimg
    } catch (err) {
        console.error("Error al obtener la imagen:", err)
    }
}

// Datos globales
global.creador = 'Wa.me/584164137403'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/+584164137403'
global.namechannel = 'ᯓ᮫݃͜ᮨ🌸 𝘚𝗎ｍ𝗂 𝘚𝗮𝗸𝘂𝗿𝗮𝘇𝗮𝘄𝗮'
global.namechannel2 = 'ᯓ᮫݃͜ᮨ🌸 𝘚𝗎ｍ𝗂 𝘚𝗮𝗸𝘂𝗿𝗮𝘇𝗮𝘄𝗮'
global.namegrupo = 'gяυρσ ∂єℓ вσт'
global.namecomu = '¢αηαℓ ∂єℓ вσт'
global.listo = '✎ *Aquí tienes ฅ^•ﻌ•^ฅ*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')

// Fechas y horarios
global.d = new Date(new Date() + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
global.mes = d.toLocaleDateString('es', { month: 'long' })
global.año = d.toLocaleDateString('es', { year: 'numeric' })
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

// Reacciones y emojis
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.emoji = '🍧'
global.emoji2 = '🍬'
global.emoji3 = '🍨'
global.emoji4 = '🍭'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

// Mensajes de espera
global.wait = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*'
global.waitt = global.wait
global.waittt = global.wait
global.waitttt = global.wait

// Enlaces y redes sociales
var canal = 'https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T'  
let canal2 = 'https://whatsapp.com/channel/0029VavzewJLikg78gILRn1o'
var git = 'https://github.com/Leoneloficial'
var github = 'https://github.com/Leoneloficial/-Starting-8-estrellas-' 
let correo = 'thekingdestroy507@gmail.com'

global.redes = [canal, canal2, git, github, correo].getRandom()

// Iconos aleatorios
global.icono = [ 
    'https://qu.ax/cJQxf.jpg',
    'https://qu.ax/LpoSn.jpg',
    'https://qu.ax/ogkkb.jpg',
    'https://qu.ax/fUGlH.jpg',
    'https://qu.ax/ZwCts.jpg',
    'https://qu.ax/QKMCx.jpg'
].getRandom()

// Respuesta con contexto de canal
global.rcanal = { 
    contextInfo: { 
        isForwarded: true, 
        forwardedNewsletterMessageInfo: { 
            newsletterJid: channelRD.id, 
            serverMessageId: 100, 
            newsletterName: channelRD.name
        }, 
        externalAdReply: { 
            showAdAttribution: true, 
            title: packname, 
            body: dev, 
            mediaUrl: null, 
            description: null, 
            previewType: "PHOTO", 
            thumbnailUrl: icono, 
            sourceUrl: redes, 
            mediaType: 1, 
            renderLargerThumbnail: false 
        } 
    } 
}

// Variables de saludo
var ase = new Date()
var hour = ase.getHours()
switch(hour) {
    case 0: case 1: case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
    case 3: case 4: case 5: case 6: case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
    case 8: case 9: case 10: case 11: case 12: case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
    case 14: case 15: case 16: case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
    default: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃';
}
global.saludo = hour

// Datos de usuario
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

// Contacto falso
global.fkontak = { 
    key: { 
        participant: `0@s.whatsapp.net`, 
        ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) 
    }, 
    message: { 
        'contactMessage': { 
            'displayName': `${nombre}`, 
            'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${nombre},;;;\nFN:${nombre},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
            'jpegThumbnail': null, 
            thumbnail: null, 
            sendEphemeral: true
        }
    }
}

export default handler

// Funciones auxiliares
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
    let randomIndex = Math.floor(Math.random() * canalIdM.length)
    let id = canalIdM[randomIndex]
    let name = canalNombreM[randomIndex]
    return { id, name }
}