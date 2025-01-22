const { MessageType } = require('@adiwajshing/baileys');

const OWNER_ID = '50558124470';  // Reemplázalo con tu número de teléfono de WhatsApp

// Mapeo de comandos a ángeles y emojis
const angeles = {
    '#angel1': { nombre: 'Zaphkiel', emoji: '😇' },
    '#angel2': { nombre: 'Michael', emoji: '👼' },
    '#angel3': { nombre: 'Gabriel', emoji: '🕊️' },
    '#angel4': { nombre: 'Raphael', emoji: '🌟' },
    '#angel5': { nombre: 'Uriel', emoji: '🔥' },
    '#angel6': { nombre: 'Chamuel', emoji: '💖' },
    '#angel7': { nombre: 'Jophiel', emoji: '🌸' }
};

// Manejador de mensajes
async function handleMessage(message, conn) {
    // Verificar si el mensaje proviene del propietario
    const sender = message.key.remoteJid;  // Obtener el remitente
    const senderId = sender.split('@')[0];  // Extraer el ID del remitente

    if (senderId !== OWNER_ID) {
        // Si no es el propietario, responder con un mensaje de error
        await conn.sendMessage(sender, 'Solo el propietario puede usar este comando.', MessageType.text);
        return;
    }

    // Verificar si el mensaje es un comando para el ángel
    const comando = message.message.conversation.trim();
    if (angeles[comando]) {
        const angel = angeles[comando];
        await conn.sendMessage(sender, `El ángel es ${angel.nombre} ${angel.emoji}`, MessageType.text);
    } else {
        await conn.sendMessage(sender, 'Comando no reconocido.', MessageType.text);
    }
}

module.exports = handleMessage;