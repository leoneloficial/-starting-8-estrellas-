let handler = async (m, { conn }) => {
  let owners = [
    { name: 'Owner 1', number: '+1234567890' },
    { name: 'Owner 2', number: '+0987654321' },
    { name: 'Owner 3', number: '+1122334455' }
  ];

  let txt = `🌟 *Owners del Bot* 🌟\n\n`;
  txt += `Puedes contactar a los dueños del bot seleccionando una opción:\n\n`;

  let buttons = owners.map(owner => ({
    buttonId: `.contact ${owner.number}`,
    buttonText: { displayText: `📞 ${owner.name}` }
  }));

  await conn.sendMessage(m.chat, {
    text: txt,
    footer: '✨ Seleccione un contacto',
    buttons,
    headerType: 1
  }, { quoted: m });
};

handler.help = ['owners'];
handler.tags = ['info'];
handler.command = ['owners', 'dueños', 'contactos'];

export default handler;