export async function before(m, { conn, participants }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return;
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  let chat = global.db.data.chats[m.chat];

  // Obtener información sobre los administradores
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  const groupAdmins = m.isGroup ? groupMetadata.participants.filter(p => p.admin).map(p => p.id) : [];
  const isAdmin = groupAdmins.includes(m.sender);

  // Comando para desactivar el bot en el grupo
  if (command === "bot off") {
    if (!m.isGroup) return await m.reply("《✧》Este comando solo se puede usar en grupos.");
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden desactivar el bot en este grupo.");

    chat.isBanned = true;
    return await m.reply("《✧》El bot ha sido *desactivado* en este grupo.");
  }

  // Comando para activar el bot en el grupo
  if (command === "bot on") {
    if (!m.isGroup) return await m.reply("《✧》Este comando solo se puede usar en grupos.");
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden activar el bot en este grupo.");

    chat.isBanned = false;
    return await m.reply("《✧》El bot ha sido *activado* en este grupo.");
  }

  // Evitar ejecución en grupos donde el bot está desactivado
  if (chat?.isBanned) {
    if (!global.botname) global.botname = "Bot";
    return await m.reply(`《✧》El bot *${global.botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`);
  }

  function validCommand(cmd, plugins) {
    return Object.values(plugins).some(plugin =>
      plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(cmd) : plugin.command === cmd)
    );
  }

  if (validCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    if (!user.commands) user.commands = 0;
    user.commands += 1;
  } else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`《✧》El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}