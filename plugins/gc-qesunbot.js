let handler = async (m, { conn }) => {
    let imagen1 = "https://qu.ax/QRFsW.jpg"; // URL fija de la imagen

    let bot = `¿𝗤𝗨𝗘 𝗘𝗦 𝗨𝗡 𝗕𝗢𝗧 𝗗𝗘 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣?

𝗨𝗻 𝗯𝗼𝘁 𝗱𝗲 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗲𝘀 𝘂𝗻𝗮 𝗶𝗻𝘁𝗲𝗹𝗶𝗴𝗲𝗻𝗰𝗶𝗮 𝗮𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹 𝗾𝘂𝗲 𝗳𝘂𝗻𝗰𝗶𝗼𝗻𝗮 𝗮 𝘁𝗿𝗮𝘃𝗲́𝘀 𝗱𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗽𝗿𝗲𝗱𝗲𝘁𝗲𝗿𝗺𝗶𝗻𝗮𝗱𝗼𝘀 𝗽𝗼𝗿 𝗹𝗼𝘀 𝗱𝗲𝘀𝗮𝗿𝗿𝗼𝗹𝗹𝗮𝗱𝗼𝗿𝗲𝘀, 𝗲𝘀𝘁𝗼𝘀 𝗰𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝘀𝗶𝗿𝘃𝗲𝗻 𝗽𝗮𝗿𝗮 𝗶𝗻𝘁𝗲𝗿𝗮𝗰𝘁𝘂𝗮𝗿 𝗰𝗼𝗻 𝗲𝗹 𝗯𝗼𝘁 𝘆 𝘀𝘂𝘀 𝗳𝘂𝗻𝗰𝗶𝗼𝗻𝗮𝗹𝗶𝗱𝗮𝗱𝗲𝘀.  
𝗟𝗼𝘀 𝗯𝗼𝘁𝘀 𝗽𝘂𝗲𝗱𝗲𝗻 𝗮𝘆𝘂𝗱𝗮𝗿 𝗮 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗿 𝗴𝗿𝘂𝗽𝗼𝘀, 𝗵𝗮𝗰𝗲𝗿 𝘁𝗮𝗿𝗲𝗮𝘀 𝗲𝗻 𝗔𝗜 𝘆 𝗺𝘂𝗰𝗵𝗼 𝗺𝗮́𝘀.  
𝗣𝗮𝗿𝗮 𝘃𝗲𝗿 𝗲𝗹 𝗺𝗲𝗻𝘂́, 𝗲𝘀𝗰𝗿𝗶𝗯𝗲: *.menu*`;

    await conn.sendFile(m.chat, imagen1, 'bot.jpg', bot);
};

handler.customPrefix = /Que es un bot de whatsapp|En que ayuda un bot|para que sirve un bot|Que es un bot|queesunbot/i;
handler.command = new RegExp();
handler.register = true;
handler.exp = 70;

export default handler;