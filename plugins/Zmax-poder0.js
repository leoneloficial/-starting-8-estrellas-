let ownersDisabled = false; // Estado global para bloquear/desbloquear comandos de owner

const handler = async (m, { conn, isOwner, command }) => {
  // Si no es un owner, no puede usar el comando
  if (!isOwner) return m.reply("❌ No tienes permiso para usar este comando.");

  // Comando para deshabilitar comandos de owner
  if (command === "poder0") {
    ownersDisabled = true;
    await m.reply("🔒 Todos los comandos de owner han sido deshabilitados hasta que uses *#poder1* o reinicies la consola.");
  } 
  // Comando para habilitar comandos de owner
  else if (command === "poder1") {
    ownersDisabled = false;
    await m.reply("🔓 Los comandos de owner han sido habilitados nuevamente.");
  }
};

handler.command = ["poder0", "poder1"];
handler.rowner = true; // Solo owners pueden usarlo

// Middleware para bloquear comandos de owner cuando están deshabilitados
const before = async (m, { isOwner, command }) => {
  if (ownersDisabled && isOwner) {
    return m.reply(`❌ No puedes usar *${command}*. Los comandos de owner están bloqueados. Usa *#poder1* para reactivarlos.`);
  }
};

// Exportamos tanto el handler como el middleware
export { handler, before };