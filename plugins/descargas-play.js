import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Ejemplo de uso: *${usedPrefix + command} Joji - Ew*`);
  }

  const appleMusic = {
    search: async (query) => {
      const url = `https://music.apple.com/us/search?term=${query}`;
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];
        $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
          const title = $(element).find('.top-search-lockup__primary__title').text().trim();
          const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
          const link = $(element).find('.click-action').attr('href');
          results.push({ title, subtitle, link });
        });
        return results;
      } catch (error) {
        console.error("Error en búsqueda de Apple Music:", error.message);
        return { success: false, message: error.message };
      }
    }
  };

  const appledown = {
    getData: async (urls) => {
      const url = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
      try {
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'MyApp/1.0',
            'Referer': 'https://aaplmusicdownloader.com/'
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error obteniendo datos de Apple Music Downloader:", error.message);
        return { success: false, message: error.message };
      }
    },

    download: async (url) => {
      const musicData = await appledown.getData(url);
      if (!musicData || !musicData.name) {
        return { success: false, message: "No se encontraron datos de música." };
      }

      // Codificar datos necesarios
      const encodedData = encodeURIComponent(JSON.stringify([
        musicData.name,
        musicData.albumname,
        musicData.artist,
        musicData.thumb,
        musicData.duration,
        musicData.url
      ]));

      const downloadUrl = 'https://aaplmusicdownloader.com/song.php';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Origin': 'https://aaplmusicdownloader.com',
        'Referer': 'https://aaplmusicdownloader.com/',
        'User-Agent': 'MyApp/1.0'
      };

      try {
        const response = await axios.post(downloadUrl, `data=${encodedData}`, { headers });
        const $ = cheerio.load(response.data);
        const trackName = $('td:contains("Track Name:")').next().text();
        const albumName = $('td:contains("Album:")').next().text();
        const artist = $('td:contains("Artist:")').next().text();
        const thumb = $('figure.image img').attr('src');
        const token = $('a#download_btn').attr('token');

        // Obtener enlace de descarga
        const audioUrl = await appledown.getAudio(trackName, artist, musicData.url, token);

        return {
          success: true,
          name: trackName,
          albumname: albumName,
          artist: artist,
          thumb: thumb,
          duration: $('td:contains("Duration:")').next().text(),
          download: audioUrl
        };
      } catch (error) {
        console.error("Error descargando música de Apple Music:", error.message);
        return { success: false, message: error.message };
      }
    },

    getAudio: async (trackName, artist, urlMusic, token) => {
      const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
      const data = {
        song_name: trackName,
        artist_name: artist,
        url: urlMusic,
        token: token
      };
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://aaplmusicdownloader.com/song.php#'
      };
      try {
        const response = await axios.post(url, qs.stringify(data), { headers });
        return response.data.dlink;
      } catch (error) {
        console.error("Error obteniendo audio de Apple Music:", error.message);
        return { success: false, message: error.message };
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  // Buscar resultados
  const searchResults = await appleMusic.search(text);
  if (!searchResults.length) {
    return m.reply("No se encontraron resultados para tu búsqueda.");
  }

  // Descargar la música
  const musicData = await appledown.download(searchResults[0].link);
  if (!musicData.success) {
    return m.reply(`Error: ${musicData.message}`);
  }

  const { name, albumname, artist, thumb, duration, download } = musicData;

  // Enviar información detallada con una miniatura
  const infoMessage = {
    image: { url: thumb },
    caption: `🎵 *Información del Audio:*\n\n` +
      `📌 *Nombre:* ${name}\n` +
      `💿 *Álbum:* ${albumname}\n` +
      `🎤 *Artista:* ${artist}\n` +
      `⏱️ *Duración:* ${duration}\n`,
    contextInfo: {
      externalAdReply: {
        title: name,
        body: `${artist} • ${albumname}`,
        mediaType: 2,
        mediaUrl: searchResults[0].link,
        thumbnailUrl: thumb,
        showAdAttribution: true
      }
    }
  };

  await conn.sendMessage(m.chat, infoMessage);

  // Enviar solo el audio sin miniatura
  const audioMessage = {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name}.mp3`
  };

  await conn.sendMessage(m.chat, audioMessage, { quoted: m });
  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^(applemusicplay|play|song)$/i;

export default handler;