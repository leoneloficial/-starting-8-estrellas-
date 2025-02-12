import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  await m.react('🍁');

  let buttons = [
    { buttonId: `.ownerinfo 1`, buttonText: { displayText: `📞 Contactar Owner` }, type: 1 },
    { buttonId: `.ownerinfo 2`, buttonText: { displayText: `🤖 Contactar Bot` }, type: 1 }
  ];

  let text = `🌟 *Owners del Bot* 🌟\n\nSelecciona una opción para ver los detalles de contacto:`;

  await conn.sendMessage(m.chat, {
    text,
    footer: '✨ Pulsa un botón para ver el contacto',
    buttons,
    headerType: 1
  }, { quoted: m });
};

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['creadoresp', 'owner'];

export default handler;

// Handler para mostrar la info cuando el usuario presiona un botón
let infoHandler = async (m, { conn, args }) => {
  let option = args[0];

  let contactsArray = [];
  if (option === '1') {
    let bio = await getBio(conn, '584164137403'); // Obtiene la biografía solo si elige "1"
    contactsArray.push([
      '584164137403',
      '👑 Staff Owner',
      '🏴 Pirata',
      '📵 No Hacer Spam',
      'leoneloficial@gmail.com',
      '🏴 Pirata',
      'https://github.com/leoneloficial/-starting-8-estrellas-',
      bio
    ]);
  } else if (option === '2') {
    contactsArray.push([
      conn.user.jid.split('@')[0],
      '🤖 Bot Oficial',
      '🏴 Pirata',
      '📵 No Hacer Spam',
      'leoneloficial@gmail.com',
      '🏴 Pirata',
      'https://github.com/leoneloficial/-starting-8-estrellas-',
      ''
    ]);
  } else {
    return conn.reply(m.chat, '❌ Opción inválida. Usa 1 o 2.', m);
  }

  await sendContactArray(conn, m.chat, contactsArray, m);
};

handler.command = ['ownerinfo'];
export { infoHandler as ownerinfo };

// Función para obtener la biografía del número
async function getBio(conn, number) {
  let bioData = await conn.fetchStatus(number + '@s.whatsapp.net').catch(() => 'Sin Biografía');
  return bioData.status?.toString() || 'Sin Biografía';
}

// Función para enviar contactos en formato vCard
async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];

  let contacts = [];
  for (let [number, name, org, label1, email, label2, url, label3] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
ORG:${org}
TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL;type=INTERNET:${email}
URL:${url}
NOTE:${label3}
END:VCARD`.trim();

    contacts.push({ vcard, displayName: name });
  }

  try {
    return await conn.sendMessage(jid, { contacts: { displayName: 'Contactos', contacts } }, { quoted, ...options });
  } catch (error) {
    console.error("Error al enviar contactos:", error);
  }
}