let handler = async (m, { conn, command, isOwner }) => {
  
  // Si los comandos de owner están desactivados, bloquear ejecución
  if (global.ownersDisabled && isOwner) {
    return m.reply("❌ Los comandos de owner están deshabilitados temporalmente.");
  }

  // Comando para desactivar los comandos de owner
  if (command === "desactivarOwners" && isOwner) {
    global.ownersDisabled = true;
    return m.reply("🔒 Los comandos de owner han sido desactivados hasta que reinicies el bot.");
  }

  // Comando opcional para volver a activar (si no quieres reiniciar)
  if (command === "restaurarOwners" && isOwner) {
    global.ownersDisabled = false;
    return m.reply("🔓 Los comandos de owner han sido restaurados.");
  }
};

// Registrar los comandos
handler.command = ['poder0', 'poder1'];
handler.owner = true; // Solo owners pueden usarlos

export default handler;