let handler = async (m, { conn, command, isOwner }) => {
  try {
    console.log(`[DEBUG] Comando recibido: ${command}`);
    console.log(`[DEBUG] Es owner: ${isOwner}`);
    console.log(`[DEBUG] Owners deshabilitados: ${global.ownersDisabled}`);

    // Si los comandos de owner están desactivados, bloquear ejecución
    if (global.ownersDisabled && isOwner) {
      console.log("[INFO] Intento de usar comando de owner cuando están deshabilitados.");
      return m.reply("❌ Los comandos de owner están deshabilitados temporalmente.");
    }

    // Comando para desactivar los comandos de owner
    if (command === "poder0" && isOwner) {
      console.log("[INFO] Desactivando comandos de owner...");
      global.ownersDisabled = true;
      m.reply("🔒 Los comandos de owner han sido desactivados hasta que reinicies el bot.");
      return;
    }

    // Comando opcional para volver a activar (sin reiniciar)
    if (command === "poder1" && isOwner) {
      console.log("[INFO] Restaurando comandos de owner...");
      global.ownersDisabled = false;
      m.reply("🔓 Los comandos de owner han sido restaurados.");
      return;
    }

    console.log("[INFO] Comando no reconocido o no autorizado.");
  } catch (e) {
    console.error("[ERROR] Ocurrió un error en el handler:", e);
    m.reply("⚠️ Ocurrió un error inesperado. Revisa la consola.");
  }
};

// Registrar los comandos
handler.command = ['poder0', 'poder1'];
handler.owner = true; // Solo owners pueden usarlos

export default handler;