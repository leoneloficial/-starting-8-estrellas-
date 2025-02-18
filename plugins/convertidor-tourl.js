import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) {
    return conn.reply(m.chat, '✎ Por favor, responde a una *Imagen* o *Vídeo.*', m)
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } }) // Reacción de espera
    
    console.log('Descargando archivo...')
    let media = await q.download()
    if (!media) {
      console.log('Error: No se pudo descargar el archivo.')
      return conn.reply(m.chat, '⚠️ Error al descargar el archivo.', m)
    }

    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    
    console.log('Subiendo archivo...')
    let link = await (isTele ? uploadImage : uploadFile)(media)

    if (!link) {
      console.log('Error: No se pudo subir el archivo.')
      return conn.reply(m.chat, '⚠️ Error al subir el archivo.', m)
    }

    console.log(`Archivo subido con éxito: ${link}`)

    let shortLink = await shortUrl(link).catch(() => link) // Usa el link original si falla el acortador

    let txt = `乂  *L I N K - E N L A C E*  乂\n\n`
        txt += `*» Enlace* : ${link}\n`
        txt += `*» Acortado* : ${shortLink}\n`
        txt += `*» Tamaño* : ${formatBytes(media.length)}\n`
        txt += `*» Expiración* : ${isTele ? 'No expira' : 'Desconocido'}\n\n`
    
    console.log('Enviando mensaje con enlace...')
    await conn.sendMessage(m.chat, { image: { url: link }, caption: txt }, { quoted: m })
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }) // Reacción de éxito

  } catch (e) {
    console.error('Error en el handler:', e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }) // Reacción de error
    conn.reply(m.chat, '⚠️ Ocurrió un error.', m)
  }
}

handler.help = ['tourl']
handler.tags = ['transformador']
handler.register = true
handler.command = ['tourl', 'upload']
export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}