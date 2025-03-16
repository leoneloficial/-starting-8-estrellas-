const handler = async (m, {conn, isAdmin, groupMetadata }) => {


if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}
  if (isAdmin) return m.reply('> 🍭 Tu ya eres admin.');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');

  await m.react(done)
   m.reply(' > ✦ Ya te di admin.');
  } catch {
    m.reply('⚠️ Ocurrio un error.');
  }
};


handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin', 'tenerpoder'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;

