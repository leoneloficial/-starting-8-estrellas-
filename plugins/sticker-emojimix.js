import { sticker, addExif } from '../lib/sticker.js';
import { Sticker } from 'wa-sticker-formatter';
import fetch from 'node-fetch';
import got from 'got';
import * as cheerio from 'cheerio';

const handler = async (m, { usedPrefix, conn, args, text, command }) => {
  let tipe, emoji;
  if (text && text.includes('|')) {
    [tipe, emoji] = text.split('|').map(s => s.trim());
  } else {
    tipe = args[0] || 'apple';
    emoji = args[1] || '😎';
  }

  const errMsg = `*[❗] USO CORRECTO:*
◉ ${usedPrefix + command} <tipo> <emoji>

*Ejemplo:*
◉ ${usedPrefix + command} fa 😎

*Tipos disponibles:* 
◉ wha = whatsapp
◉ ap = apple
◉ fa = facebook
◉ mi = microsoft
◉ ht = htc
◉ tw = twitter
◉ go = google
◉ mo = mozilla
◉ op = openmoji
◉ pi = pixel
◉ sa = samsung

*Solo usar un emoji y respetar los espacios.*`;

  if (!emoji) throw errMsg;

  // Normalización de nombres
  const tipeMap = {
    mo: 'mozilla',
    op: 'openmoji',
    pi: 'joypixels',
    sa: 'samsung',
    go: 'google',
    wha: 'whatsapp',
    fa: 'facebook',
    ap: 'apple',
    mi: 'microsoft',
    ht: 'htc',
    tw: 'twitter'
  };
  
  tipe = tipeMap[tipe] || tipe.toLowerCase();

  try {
    emoji = emoji.trim();
    const json = await semoji(emoji);
    if (!json.length) throw new Error("Emoji no encontrado.");

    let chosenURL = json.find(v => v.nama.includes(tipe))?.url || json[0].url;

    console.log("Sticker URL:", chosenURL);
    
    const stiker = await createSticker(false, chosenURL, global.packname, global.author, 20);
    
    await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw `*[❗] ERROR, INTENTA NUEVAMENTE*`;
  }
};

handler.help = ['emoji <tipo> <emoji>'];
handler.tags = ['sticker'];
handler.command = ['emoji', 'smoji', 'semoji'];
export default handler;

// Función para obtener URLs de emojis
async function semoji(emoji) {
  try {
    const result = [];
    const url = `https://emojipedia.org/${encodeURIComponent(emoji)}/`;
    const response = await got(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(response.body);

    $('section.vendor-list ul li').each((_, element) => {
      const nama = $(element).find('div.vendor-info h2 a').text().trim().toLowerCase();
      const url = $(element).find('div.vendor-image img').attr('src');
      if (nama && url) result.push({ nama, url });
    });

    return result;
  } catch (error) {
    console.error("Error obteniendo emojis:", error);
    return [];
  }
}

// Función para crear sticker
async function createSticker(img, url, packName, authorName, quality) {
  const stickerMetadata = { type: 'full', pack: packName, author: authorName, quality };
  return new Sticker(img || url, stickerMetadata).toBuffer();
}

// Función para convertir MP4 a WebP (para stickers animados)
async function mp4ToWebp(file, stickerMetadata = { pack: '‎', author: '‎', crop: false }) {
  const base64File = file.toString('base64');
  const requestBody = {
    file: `data:video/mp4;base64,${base64File}`,
    processOptions: { crop: stickerMetadata.crop, startTime: '00:00:00.0', endTime: '00:00:07.0', loop: 0 },
    stickerMetadata,
    sessionInfo: {
      WA_VERSION: '2.2106.5',
      PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0',
      OS: 'Windows Server 2016'
    },
    config: { sessionId: 'session', headless: true, qrTimeout: 20 }
  };

  const res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  return Buffer.from((await res.text()).split(';base64,')[1], 'base64');
}