export async function before(m, { isAdmin, isBotAdmin }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return;
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  // Comandos para activar o desactivar el bot en el grupo
  let chat = global.db.data.chats[m.chat];

  if (command === "bot off") {
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden desactivar el bot en este grupo.");
    chat.isBanned = true;
    return await m.reply("《✧》El bot ha sido *desactivado* en este grupo.");
  }

  if (command === "bot on") {
    if (!isAdmin) return await m.reply("《✧》Solo los administradores pueden activar el bot en este grupo.");
    chat.isBanned = false;
    return await m.reply("《✧》El bot ha sido *activado* en este grupo.");
  }

  // Evitar ejecución en grupos donde el bot está desactivado
  if (chat?.isBanned) {
    if (!global.botname) global.botname = "Bot"; // Definir botname si no existe
    const avisoDesactivado = `《✧》El bot *${global.botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
    return await m.reply(avisoDesactivado);
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