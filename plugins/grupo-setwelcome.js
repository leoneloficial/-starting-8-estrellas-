let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('🍬 Por favor, proporciona una bienvenida para el bot.\n> Ejemplo: #setwelcome Hola user');

  global.welcom1 = text.trim();
  
  m.reply(`✎ La bienvenida del bot ha sido cambiado a: ${global.welcom1}`);
};

handler.help = ['setwelcome'];
handler.tags = ['tools'];
handler.command = ['setwelcome'];
handler.owner = false;
handler.admin = true;

export default handler;
