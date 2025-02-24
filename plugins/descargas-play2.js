import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)

  let isUrl = isYouTubeUrl(text)
  if (!isUrl) return conn.reply(m.chat, "❀ Ingresa una URL válida de YouTube.", m)

  try {
    let api = await (await fetch(`https://api.lyrax.net/api/dl/ytdl?url=${text}&apikey=0a2cc90e`)).json()
    let { file_url, title } = api.data
    let { type, size, duration } = api.data.info

    await conn.sendMessage(m.chat, {
      document: { url: file_url },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
      caption: `🌿 Titulo: ${title}\n🌲 Duración: ${duration}\n🌴 Peso: ${size}\n🌾 Tipo: ${type}`
    }, { quoted: m })
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, "❀ Hubo un error al obtener el video, intenta nuevamente.", m)
  }
}

HS.command = ['ytmp4', 'ytv']
export default HS

function isYouTubeUrl(text) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/\S+|youtu\.be\/\S+)/
  return youtubeRegex.test(text)
}