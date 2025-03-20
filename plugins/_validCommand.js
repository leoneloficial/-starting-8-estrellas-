export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return; // Evita errores si no hay coincidencia

  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === "bot") return;

  // Función para verificar si un comando existe en los plugins
  const validCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => 
      plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
    );
  };

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat] || {};
    let user = global.db.data.users[m.sender] || {};

    if (chat.isBanned) {
      const avisoDesactivado = `《✦》El bot *${global.botname || 'bot'}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
      await m.reply(avisoDesactivado);
      return;
    }

    user.commands = (user.commands || 0) + 1;
    global.db.data.users[m.sender] = user; // Asegurar que se guarde el cambio
  } else {
    await m.reply(`《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}