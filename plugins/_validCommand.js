/*Reactualizado por Zaphkiel*/



export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const match = global.prefix.exec(m.text);
  if (!match) return; 

  const usedPrefix = match[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command) return;

  let chat = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat] = chat; 

  const botname = global.botname || "bot"; 
  const isGroup = m.isGroup;
  const groupMetadata = isGroup ? await conn.groupMetadata(m.chat).catch(() => null) : null;
  const participants = groupMetadata?.participants || [];
  const sender = m.sender;
  const isAdmin = participants.some(p => p.id === sender && p.admin);

  
  if (isGroup && isAdmin) {
    if (command === "bot" && m.text.toLowerCase().includes("on")) {
      chat.isBanned = false;
      await m.reply(`《✦》El bot *${botname}* está activo nuevamente en este grupo.\n\n> ✦ Puede desactivarlo con el comando:\n> » *${usedPrefix}bot off*`);
      return;
    }

    if (command === "bot" && m.text.toLowerCase().includes("off")) {
      chat.isBanned = true;
      await m.reply(`《✦》 *${botname}* está desactivado en este grupo.\n\n> ✦ Solo un admin puede reactivarlo con el comando:\n> » *${usedPrefix}bot on*`);
      return;
    }
  }

  
  if (chat.isBanned) {
    const avisoDesactivado = `《✦》 *${botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
    await m.reply(avisoDesactivado);
    return;
  }

  const validCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => 
      plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
    );
  };

  if (validCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender] || {};
    user.commands = (user.commands || 0) + 1;
    global.db.data.users[m.sender] = user; 
  } else {
    await m.reply(`《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}