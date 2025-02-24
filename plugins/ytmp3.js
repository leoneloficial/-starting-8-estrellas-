case 'ytmp3': {
    const fs = require('fs');
    const path = require('path');
    const fetch = require('node-fetch');
    const ytdl = require('./libs/ytdl');
    const yts = require('yt-search');

    if (!args.length || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(args[0])) {
        return sock.sendMessage(msg.key.remoteJid, { text: 'Por favor, ingresa un enlace de YouTube válido.' });
    }
await sock.sendMessage(msg.key.remoteJid, {
            react: {
                text: '⏱️',
                key: msg.key,
            },
        });
                
    await sock.sendMessage(msg.key.remoteJid, { text: '🚀 Procesando tu solicitud...' });
    const videoUrl = args[0];

    try {
        const searchResult = await yts({ videoId: videoUrl.split('v=')[1] || videoUrl.split('/').pop() });
        if (!searchResult || !searchResult.title || !searchResult.thumbnail) {
            throw new Error('No se pudo obtener la información del video.');
        }

        const videoInfo = {
            title: searchResult.title,
            thumbnail: await (await fetch(searchResult.thumbnail)).buffer()
        };

        const ytdlResult = await ytdl(videoUrl);
        if (ytdlResult.status !== 'success' || !ytdlResult.dl) {
            throw new Error('No se pudo obtener el enlace de descarga.');
        }

        const tmpDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

        const filePath = path.join(tmpDir, `${Date.now()}.mp3`);
        const response = await fetch(ytdlResult.dl);
        const buffer = await response.buffer();
        fs.writeFileSync(filePath, buffer);

        await sock.sendMessage(msg.key.remoteJid, {
            audio: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${videoInfo.title}.mp3`,
        }, { quoted: msg });

        fs.unlinkSync(filePath);
    } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Ocurrió un error al intentar descargar el audio.' });
    }
    break;
}