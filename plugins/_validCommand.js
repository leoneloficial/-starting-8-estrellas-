export async function before(m, { conn, participants, isAdmin, isBotAdmin, isGroup }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return;
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  let chat = global.db.data.chats[m.chat];

  // Manejo de comandos "bot off" y "bot on"
  if (command === "bot" && m.text.toLowerCase().includes("off")) {
    if (!isGroup) return await m.reply("《✧》Este comando solo se puede usar en grupos.");
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden desactivar el bot en este grupo.");

    chat.isBanned = true;
    return await m.reply("《✧》El bot ha sido *desactivado* en este grupo.\n\n> ✦ Un administrador puede reactivarlo con:\n> » *" + usedPrefix + "bot on*");
  }

  if (command === "bot" && m.text.toLowerCase().includes("on")) {
    if (!isGroup) return await m.reply("《✧》Este comando solo se puede usar en grupos.");
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden activar el bot en este grupo.");

    chat.isBanned = false;
    return await m.reply("《✧》El bot ha sido *activado* en este grupo.\n\n> ✦ Ahora puedes usar los comandos.");
  }

  // Bloquear comandos si el bot está desactivado en el grupo
  if (chat?.isBanned) {
    return await m.reply(`《✧》El bot está desactivado en este grupo.\n\n> ✦ Un administrador puede activarlo con:\n> » *${usedPrefix}bot on*`);
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