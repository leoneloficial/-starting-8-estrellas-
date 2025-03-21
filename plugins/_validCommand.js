export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return;
  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  // Evitar ejecución en unbanchat
  if (command === "unbanchat") return;

  function validCommand(cmd, plugins) {
    return Object.values(plugins).some(plugin =>
      plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(cmd) : plugin.command === cmd)
    );
  }

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      if (!global.botname) global.botname = "Bot"; // Definir botname si no existe
      const avisoDesactivado = `《✧》El bot *${global.botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}unbanchat*`;
      await m.reply(avisoDesactivado);
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;
  } else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`《✧》El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}