let handler = async (m, { conn, text, isRowner }) => {

if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}
  if (!text) return m.reply('🍬 Por favor, proporciona un nombre para el bot.\n> Ejemplo: #setmoneda Coins');

  global.moneda = text.trim();
  
  m.reply(`🍬 La moneda del bot ha sido cambiado a: ${global.moneda}`);
};

handler.help = ['setmoneda'];
handler.tags = ['tools'];
handler.command = ['setmoneda'];
handler.rowner = true;

export default handler;
