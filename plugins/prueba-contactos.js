import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  await m.react('🍁');

  let ownerContacts = [
    { name: '👑 Staff Owner', number: '584164137403' },
    { name: '🤖 Bot Oficial', number: conn.user.jid.split('@')[0] }
  ];

  let buttons = [
    { buttonId: `.ownerinfo 1`, buttonText: { displayText: `📞 Contactar Owner` } },
    { buttonId: `.ownerinfo 2`, buttonText: { displayText: `🤖 Contactar Bot` } }
  ];

  let text = `🌟 *Owners del Bot* 🌟\n\nSelecciona una opción para ver los detalles de contacto:\n`;

  await conn.sendMessage(m.chat, {
    text,
    footer: '✨ Elige una opción',
    buttons,
    headerType: 1
  }, { quoted: m });
};

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['creador','contactosp', 'owner'];

export default handler;

// Handler para mostrar la info cuando se elige un botón
let infoHandler = async (m, { conn, args }) => {
  let option = args[0];
  
  let contactsArray = [];
  if (option === '1') {
    let bio = await getBio(conn, '584164137403');
    contactsArray.push(['584164137403', '👑 Staff Owner', '🏴 Pirata', '📵 No Hacer Spam', 'leoneloficial@gmail.com', '🏴 Pirata', 'https://github.com/leoneloficial/-starting-8-estrellas-', bio]);
  } else if (option === '2') {
    contactsArray.push([conn.user.jid.split('@')[0], '🤖 Bot Oficial', '🏴 Pirata', '📵 No Hacer Spam', 'leoneloficial@gmail.com', '🏴 Pirata', 'https://github.com/leoneloficial/-starting-8-estrellas-', '']);
  } else {
    return conn.reply(m.chat, '❌ Opción inválida. Usa 1 o 2.', m);
  }

  await sendContactArray(conn, m.chat, contactsArray, m);
};

handler.command = ['ownerinfo'];
export { infoHandler as ownerinfo };

async function getBio(conn, number) {
  let bioData = await conn.fetchStatus(number + '@s.whatsapp.net').catch(() => 'Sin Biografía');
  return bioData.status?.toString() || 'Sin Biografía';
}

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];

  let contacts = [];
  for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim();

    contacts.push({ vcard, displayName: name });
  }

  try {
    return await conn.sendMessage(jid, {
      contacts: {
        displayName: (contacts.length > 1 ? `Contactos` : contacts[0].displayName) || null,
        contacts,
      }
    }, {
      quoted,
      ...options
    });
  } catch (error) {
    console.error("Error al enviar contactos:", error);
  }
}