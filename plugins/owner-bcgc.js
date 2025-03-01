const handler = async (m, { conn, isROwner, text }) => {
  const delay = (time) => new Promise((res) => setTimeout(res, time));
  
  try {
    const getGroups = await conn.groupFetchAllParticipating();
    const groups = Object.values(getGroups); // No es necesario usar `Object.entries`
    const anu = groups.map((v) => v.id);
    
    const pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
    if (!pesan) throw '🍬 *Te faltó el texto.*';

    for (const i of anu) {
      await delay(500);
      await conn.relayMessage(i, {
        liveLocationMessage: {
          degreesLatitude: 35.685506276233525,
          degreesLongitude: 139.75270667105852,
          accuracyInMeters: 0,
          degreesClockwiseFromMagneticNorth: 2,
          caption: `⭐️ M E N S A J E ⭐️\n\n${pesan} ${global.packname || ''}`, 
          sequenceNumber: 2,
          timeOffset: 3
        },
        messageContextInfo: { mentionedJid: [m.sender] } // Agregamos contexto
      }, {});
    }

    m.reply(`🍭 *𝖬𝖾𝗇𝗌𝖺𝗃𝖾 𝖤𝗇𝗏𝗂𝖺𝖽𝗈 𝖠:* ${anu.length} *Grupo/S*`);
  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al enviar el mensaje.');
  }
};

handler.help = ['broadcastgroup', 'bcgc'];
handler.tags = ['owner'];
handler.command = ['bcgc'];
handler.owner = true;

export default handler;