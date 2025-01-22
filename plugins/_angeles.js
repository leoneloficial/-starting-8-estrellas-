// Mapeo de comandos a ángeles y sus emojis
const angeles = {
    '#angel1': { nombre: 'Zaphkiel', emoji: '😇' },
    '#angel2': { nombre: 'Michael', emoji: '👼' },
    '#angel3': { nombre: 'Gabriel', emoji: '🕊️' },
    '#angel4': { nombre: 'Raphael', emoji: '🌟' },
    '#angel5': { nombre: 'Uriel', emoji: '🔥' },
    '#angel6': { nombre: 'Chamuel', emoji: '💖' },
    '#angel7': { nombre: 'Jophiel', emoji: '🌸' }
};

// Función para responder al comando
function responderComando(comando) {
    if (angeles[comando]) {
        const angel = angeles[comando];
        console.log(`El ángel es ${angel.nombre} ${angel.emoji}`);
    } else {
        console.log('Comando no reconocido.');
    }
}

// Ejemplo de uso
responderComando('#angel1'); // Esto responderá con "El ángel es Zaphkiel 😇"
responderComando('#angel3'); // Esto responderá con "El ángel es Gabriel 🕊️"
