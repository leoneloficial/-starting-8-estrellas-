export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return; // Evita errores si no hay coincidencia

  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command) return;

  let chat = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat] = chat; // Asegurar que se guarde en la base de datos

  const botname = global.botname || "bot"; // Evita error si `botname` no está definido
  const isGroup = m.isGroup;
  const groupMetadata = isGroup ? await conn.groupMetadata(m.chat).catch(() => null) : null;
  const participants = groupMetadata?.participants || [];
  const sender = m.sender;
  const isAdmin = participants.some(p => p.id === sender && p.admin);

  // Solo en grupos y solo admins pueden activar/desactivar el bot
  if (isGroup && isAdmin) {
    if (command === "bot" && m.text.toLowerCase().includes("on")) {
      chat.isBanned = false;
      await m.reply(`《✦》El bot *${botname}* está activo nuevamente en este grupo.\n\n> ✦ Puede desactivarlo con el comando:\n> » *${usedPrefix}bot off*`);
      return;
    }

    if (command === "bot" && m.text.toLowerCase().includes("off")) {
      chat.isBanned = true;
      await m.reply(`《✦》El bot *${botname}* está desactivado en este grupo.\n\n> ✦ Solo un admin puede reactivarlo con el comando:\n> » *${usedPrefix}bot on*`);
      return;
    }
  }

  // Si el bot está desactivado en el grupo, enviar mensaje informativo y no procesar comandos
  if (chat.isBanned) {
    const avisoDesactivado = `《✦》El bot *${botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
    await m.reply(avisoDesactivado);
    return;
  }

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