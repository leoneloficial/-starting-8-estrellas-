export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return; // Evita errores si no hay coincidencia

  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command) return;

  let chat = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat] = chat; // Asegurar que se guarde en la base de datos

  // Si el comando es "bot on", activa el bot en el grupo
  if (command === "bot" && m.text.toLowerCase().includes("on")) {
    chat.isBanned = false;
    await m.reply("✅ El bot ha sido activado en este grupo.");
    return;
  }

  // Si el comando es "bot off", desactiva el bot en el grupo
  if (command === "bot" && m.text.toLowerCase().includes("off")) {
    chat.isBanned = true;
    await m.reply("❌ El bot ha sido desactivado en este grupo.");
    return;
  }

  // Si el bot está desactivado en el grupo, no responderá a otros comandos
  if (chat.isBanned) return;

  // Función para verificar si un comando existe en los plugins
  const validCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => 
      plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
    );
  };

  if (validCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender] || {};
    user.commands = (user.commands || 0) + 1;
    global.db.data.users[m.sender] = user; // Asegurar que se guarde el cambio
  } else {
    await m.reply(`《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}