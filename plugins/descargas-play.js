import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`🍇 Ingresa el nombre de lo que quieres buscar\`*', m, rcanal);

  await m.react('🕓');

  try {
    let video;
    while (true) {
      let res = await search(args.join(" "));
      if (res.length > 0) {
        video = res[0];
        break;
      }
      console.log('No se encontraron resultados. Intentando búsqueda nuevamente...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    let img = await (await fetch(video.image)).buffer();
    const txt = '`乂  Y O U T U B E  -  P L A Y`\n\n';
    txt += `\t\t*» Título* : ${video.title}\n`;
    txt += `\t\t*» Duración* : ${secondString(video.duration.seconds)}\n`;
    txt += `\t\t*» Publicado* : ${video.ago}\n`;
    txt += `\t\t*» Canal* : ${video.author.name || 'Desconocido'}\n`;
    txt += `\t\t*» ID* : ${video.videoId}\n`;
    txt += `\t\t*» Url* : ${'https://youtu.be/' + video.videoId}\n\n`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt,
      footer: 'Presiona el botón para el tipo de descarga.',
      buttons: [
        {
          buttonId: `.ytmp3 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: '🎵 Audio',
          },
        },
        {
          buttonId: `.ytmp4 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: '🎥 Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('✖️');
    conn.reply(m.chat, '*\`Error al buscar el video.\`*', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function search(query, options = {}) {
  let searchResults = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return searchResults.videos;
}

function secondString(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}