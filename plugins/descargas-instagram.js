import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '✎ Por favor, ingresa un enlace de Instagram.', m);
  }

  try {
    await m.react(rwait);
    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '»  ⊹˚୨ •(=^●ω●^=)•🌸

> ✿ 720p (HD)
> ✿ 360p (SD)
> ✿ 1080p

> ✿  Enviado en 720p (HD)

> © Sumi sakurazawa 2.4 Bot', m);
    await m.react(done);
    }
  } catch (e) {
    return conn.reply(m.chat, '⚠️ Ocurrió un error.', m);
    await m.react(error);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.coin = 1;
handler.register = true;

export default handler;