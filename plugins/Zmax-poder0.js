let ownersDisabled = false; // Variable para desactivar owners temporalmente

// Comando para deshabilitar a los owners
async function handlerPoder0(m, { isOwner, reply }) {
    if (!isOwner) return reply("❌ No tienes permiso para usar este comando.");

    ownersDisabled = true;
    reply("🔒 Todos los comandos de owner han sido deshabilitados hasta reiniciar la consola.");
}

// Middleware para bloquear comandos de owners cuando estén deshabilitados
function ownerMiddleware(m, next) {
    if (ownersDisabled && m.isOwner) {
        return m.reply("❌ Los comandos de owner están deshabilitados hasta reiniciar la consola.");
    }
    next();
}

// Agregar el comando al handler
handlerPoder0.command = ["poder0"];
handlerPoder0.rowner = true; // Solo owners pueden usarlo

// Exportar el comando y el middleware
export default {
    before: ownerMiddleware, // Middleware que bloquea comandos de owner si están deshabilitados
    handler: handlerPoder0,
};