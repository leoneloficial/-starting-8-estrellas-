let ownersDisabled = false; // Variable para desactivar owners temporalmente

export async function handler(m, { conn, isOwner }) {
    if (!isOwner) return conn.reply(m.chat, "❌ No tienes permiso para usar este comando.", m);

    ownersDisabled = true;
    await conn.reply(m.chat, "🔒 Todos los comandos de owner han sido deshabilitados hasta reiniciar la consola.", m);
}

// Configuración del comando en el handler
handler.command = ["poder0"];
handler.rowner = true; // Solo owners pueden usarlo

// Middleware para bloquear comandos de owner si están deshabilitados
export async function before(m, { isOwner }) {
    if (ownersDisabled && isOwner) {
        return m.reply("❌ Los comandos de owner están deshabilitados hasta reiniciar la consola.");
    }
}

// Aplicar el middleware a todos los comandos
before.all = true;

export default handler;