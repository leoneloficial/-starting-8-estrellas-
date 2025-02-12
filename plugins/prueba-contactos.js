import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  await m.react('🍁');

  let buttons = [
    { buttonId: `.ownerinfo 1`, buttonText: { displayText: `📞 Owner 1` }, type: 1 },
    { buttonId: `.ownerinfo 2`, buttonText: { displayText: `📞 Owner 2` }, type: 1 }
  ];

  let text = `🌟 *Owners del Bot* 🌟\n\nSelecciona una opción para ver el contacto:`;

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

// Handler para mostrar el contacto cuando se presiona un botón
let infoHandler = async (m, { conn, args }) => {
  let option = args[0];

  let contactsArray = [];
  if (option === '1') {
    contactsArray.push(['584164137403', '👑 Owner 1']);
  } else if (option === '2') {
    contactsArray.push(['584123456789', '👑 Owner 2']);
  } else {
    return conn.reply(m.chat, '❌ Opción inválida. Usa 1 o 2.', m);
  }

  await sendContactArray(conn, m.chat, contactsArray, m);
};

handler.command = ['ownerinfo'];
export { infoHandler as ownerinfo };

// Función para enviar contactos en formato vCard
async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];

  let contacts = [];
  for (let [number, name] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`.trim();

    contacts.push({ vcard, displayName: name });
  }

  try {
    return await conn.sendMessage(jid, { contacts: { displayName: 'Contactos', contacts } }, { quoted, ...options });
  } catch (error) {
    console.error("Error al enviar contactos:", error);
  }
}