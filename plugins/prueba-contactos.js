import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  await m.react('🍁');

  let ownerContacts = [
    { name: '👑 Staff Owner', number: '584164137403', bio: await getBio(conn, '584164137403') },
    { name: '🤖 Bot Oficial', number: conn.user.jid.split('@')[0], bio: await getBio(conn, conn.user.jid.split('@')[0]) }
  ];

  let contactsArray = ownerContacts.map(contact => [
    contact.number,
    contact.name,
    '🏴 Pirata',
    '📵 No Hacer Spam',
    'leoneloficial@gmail.com',
    '🏴 Pirata',
    'https://github.com/leoneloficial/-starting-8-estrellas-',
    contact.bio
  ]);

  await sendContactArray(conn, m.chat, contactsArray, m);

  let buttons = ownerContacts.map(contact => ({
    buttonId: `.contact ${contact.number}`,
    buttonText: { displayText: `📞 ${contact.name}` }
  }));

  let text = `🌟 *Owners del Bot* 🌟\n\nPuedes contactar a los dueños del bot seleccionando una opción:\n\n`;

  await conn.sendMessage(m.chat, {
    text,
    footer: '✨ Seleccione un contacto',
    buttons,
    headerType: 1
  }, { quoted: m });
};

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['contactosp', 'owner'];

export default handler;

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
        displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
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