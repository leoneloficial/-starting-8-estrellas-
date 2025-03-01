module.exports = async function (sock) {
    const CREATOR = 'Tu Nombre Aquí';
    const BOT_NAME = 'Starting-8-estrellas';
    let startTime = Date.now();

    function getUptime() {
        let uptimeMs = Date.now() - startTime;
        let seconds = Math.floor((uptimeMs / 1000) % 60);
        let minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
        let hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
        let days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    async function updateDescription() {
        try {
            let description = `🤖 ${BOT_NAME}  
⏳ Activo: ${getUptime()}  
👤 Creador: ${CREATOR}`;

            await sock.updateProfileStatus(description);
            console.log('Descripción actualizada:', description);
        } catch (error) {
            console.error('Error al actualizar la descripción:', error);
        }
    }

    // Primera actualización al iniciar
    await updateDescription();

    // Actualizar cada 10 minutos
    setInterval(updateDescription, 10 * 60 * 1000);
};