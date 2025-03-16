let handler = async (m, { conn, command, isOwner }) => {
  console.log(`[DEBUG] Comando recibido: ${command}, Es owner: ${isOwner}, Owners deshabilitados: ${global.ownersDisabled}`);

  // Si los comandos de owner están desactivados, bloquear ejecución
  if (global.ownersDisabled && isOwner) {
    console.log("[INFO] Comando bloqueado porque los owners están deshabilitados.");
    return m.reply("❌ Los comandos de owner están deshabilitados temporalmente.");
  }

  // Comando para desactivar los comandos de owner
  if (command === "desactivarOwners" && isOwner) {
    global.ownersDisabled = true;
    console.log("[INFO] Los comandos de owner han sido desactivados.");
    return m.reply("🔒 Los comandos de owner han sido desactivados hasta que reinicies el bot.");
  }

  // Comando opcional para volver a activar (sin reiniciar)
  if (command === "restaurarOwners" && isOwner) {
    global.ownersDisabled = false;
    console.log("[INFO] Los comandos de owner han sido restaurados.");
    return m.reply("🔓 Los comandos de owner han sido restaurados.");
  }
};

// Registrar los comandos
handler.command = ['desactivarOwners', 'restaurarOwners'];
handler.owner = true; // Solo owners pueden usarlos

export default handler;