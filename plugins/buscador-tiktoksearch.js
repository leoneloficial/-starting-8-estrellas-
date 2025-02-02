

// *— ★! TIKTOK - SEARCH*
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text)  return conn.reply(m.chat, `❀ Ingresa el texto de lo que quieras buscar`, m)
    
try {
let info = await tiktok.search(text)
let randomvid = Math.floor(Math.random() * info.length)
let { metadata, estadisticas, audio, author, media } = info[randomvid]
let HS =  `*[ INFO - VIDEO ]*
- *Titulo :* ${metadata.titulo}
- *Duracion :* ${metadata.duracion} segundos
- *Creado :* ${metadata.creado}

*[ INFO - ESTADISTICAS ]*
- *Reproducciones :* ${estadisticas.reproducciones}
- *Likes :* ${estadisticas.likes}
- *Comentarios :* ${estadisticas.comentarios}
- *Compartidos :* ${estadisticas.compartidos}
- *Descargas :* ${estadisticas.descargas}

*[ INFO - AUTHOR ]*
- *name :* ${author.name}
- *username :* ${author.username}`


await conn.sendFile(m.chat, media.no_watermark, 'HasumiBotFreeCodes.mp4', HS, m)
} catch (error) {
console.error(error)    
}}

HS.command = ['tiktoksearch']

export default HS

const tiktok = {
  search: async function (q) {
    try {
      const data = {
        count: 20,
        cursor: 0,
        web: 1,
        hd: 1,
        keywords: q,
      };

      const config = {
        method: "post",
        url: "https://tikwm.com/api/feed/search",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json, text/javascript, /; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://tikwm.com/",
        },
        data: data,
      }

const response = await axios(config)

if (response.data.data) {
return response.data.data.videos.map((a) => ({
metadata: {
titulo: a.title,
duracion: a.duration,
region: a.region,
video_id: a.video_id,
imagen: "https://tikwm.com" + a.cover,
creado: new Date(a.create_time * 1000).toLocaleString("es-AR", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false 
}),
},
estadisticas: {
reproducciones: Number(a.play_count).toLocaleString(),
likes: Number(a.digg_count).toLocaleString(),
comentarios: Number(a.comment_count).toLocaleString(),
compartidos: Number(a.share_count).toLocaleString(),
descargas: Number(a.download_count).toLocaleString(),
},
music: a.music_info,
author: {
name: a.author.nickname,
username: "@" + a.author.unique_id,
avatar: "https://tikwm.com" + a.author.avatar,
},
media: {
no_watermark: "https://tikwm.com" + a.play,
watermark: "https://tikwm.com" + a.wmplay,
audio: "https://tikwm.com" + a.music,
}
}));
} else {
throw new Error('sin informacion disponible')
}
} catch (error) {
throw new Error('TIKTOK SEARCH ERROR ' + error)
}}}