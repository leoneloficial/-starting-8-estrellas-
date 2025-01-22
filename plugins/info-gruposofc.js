import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con el grupo .....*

- ${namegrupo}
*❀* ${gp1}

- ${namecomu}
*❀* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ${namechannel}
*❀* ${channel}

- 𝓖𝓡𝓤𝓟𝓞 𝓞𝓕𝓤𝓐𝓛
*❀* ${channel2}

> ${dev}`

await conn.sendFile(m.chat, miniurl, "yuki.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']
export default handler
