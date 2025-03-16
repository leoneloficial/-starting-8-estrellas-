let ownersDisabled = false; // Variable para desactivar owners temporalmente

export async function handler(m, { conn, isOwner }) {
    if (!isOwner) return conn.reply(m.chat, "❌ No tienes permiso para usar este comando.", m);

    ownersDisabled = true;
    await conn.reply(m.chat, "🔒 Todos los comandos de owner han sido deshabilitados hasta reiniciar la consola.", m);
}

// Configuración del comando en el handler
handler.command = ["poder0"];
handler.rowner = true; // Solo owners pueden usarlo

// Intercepta todos los comandos antes de ejecutarse
global.before = async function (m, { isOwner, usedPrefix, command }) {
    if (ownersDisabled && isOwner) {
        return m.reply(`❌ El comando *${usedPrefix}${command}* ha sido bloqueado. Los comandos de owner están deshabilitados hasta reiniciar la consola.`);
    }
};

export default handler;