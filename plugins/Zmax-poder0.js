let ownersDisabled = false; // Variable para desactivar owners temporalmente

export async function handler(m, { conn, isOwner, text }) {
    if (!isOwner) return conn.reply(m.chat, "❌ No tienes permiso para usar este comando.", m);

    ownersDisabled = true;
    return conn.reply(m.chat, "🔒 Todos los comandos de owner han sido deshabilitados hasta reiniciar la consola.", m);
}

// Configuración del comando en el handler
handler.command = ["poder0"];
handler.rowner = true; // Restringido a owners

// Middleware para bloquear comandos de owner si están deshabilitados
export async function before(m) {
    if (ownersDisabled && global.owner.some(([num]) => num === m.sender.split("@")[0])) {
        return m.reply("❌ Los comandos de owner están deshabilitados hasta reiniciar la consola.");
    }
}