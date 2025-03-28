import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 100; 

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(
      m.chat,
      `✦ *¡Ingresa el texto o enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* Canción de ejemplo`,
      m
    );
  }

  await m.react('🕓'); 

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {

      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      // Si es un texto
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(() => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let videoInfo = yt.video['360p']; 

    if (!videoInfo) {
      return star.reply(m.chat, '✦ *No se encontró una calidad compatible para el video.*', m).then(() => m.react('✖️'));
    }

    let { fileSizeH: sizeHumanReadable, fileSize } = videoInfo;


    let sizeMB = fileSize / (1024 * 1024); 


    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(() => m.react('✖️'));
    }


    let durationInMinutes = parseFloat(timestamp.split(':')[0]) * 60 + parseFloat(timestamp.split(':')[1]);


    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${sizeHumanReadable}\n\n`;
    //txt += `> *- ↻ El video se está enviando, espera un momento...*`;


    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);


    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '✦ *Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    // Enviar el video según el tamaño o la duración
    if (sizeMB > limit || durationInMinutes > 30) {
      // Enviar como documento si el tamaño supera los 100 MB o si dura más de 30 minutos
      await star.sendMessage(
        m.chat,
        { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
      await m.react('📄'); // Reacción de documento
    } else {
      // Enviar como video normal si es menor o igual al límite y dura menos de 30 minutos
      await star.sendMessage(
        m.chat,
        { video: { url: downloadUrl }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
      await m.react('✅'); // Reacción de éxito
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Error durante el proceso
    star.reply(m.chat, '✦ *Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.*', m);
  }
};


handler.command = ['play4', 'playvidoc']; // Comandos disponibles

export default handler;