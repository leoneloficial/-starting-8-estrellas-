import ytdlp from 'yt-dlp-exec';
import fs from 'fs';
import { exec } from 'child_process';

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
    let audioPath = './temp/instrumental.mp3';

    // Si el usuario responde a un audio
    if (m.quoted && m.quoted.mimetype?.startsWith('audio/')) {
        let audio = await m.quoted.download();
        fs.writeFileSync(audioPath, audio);

        // Procesar el audio para extraer la instrumental
        await exec(`spleeter separate -p spleeter:2stems -o output ${audioPath}`, (err, stdout, stderr) => {
            if (err) {
                return m.reply('❌ Error al procesar el audio.');
            }
            let instrumentalPath = './output/instrumental.wav';
            conn.sendMessage(m.chat, { audio: fs.readFileSync(instrumentalPath), mimetype: 'audio/mp3' });
        });
        return;
    }

    // Si el usuario envía un enlace de YouTube
    if (args[0] && args[0].includes('youtu')) {
        let url = args[0].split('&')[0]; // Limpia parámetros innecesarios
        m.reply('🎵 Descargando audio desde YouTube...');

        try {
            await ytdlp(url, {
                output: audioPath,
                format: 'bestaudio[ext=mp3]'
            });

            conn.sendMessage(m.chat, { audio: fs.readFileSync(audioPath), mimetype: 'audio/mp3' });
        } catch (error) {
            m.reply('❌ Error al descargar el audio. Asegúrate de que el enlace es válido.');
        }
        return;
    }

    // Si no responde a un audio ni envía enlace
    m.reply(`⚠️ Responde a un audio o envía un enlace de YouTube.\nEjemplo: \`${usedPrefix + command} https://youtu.be/XXXXX\``);
};

handler.command = ['instrumental'];
export default handler;