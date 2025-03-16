import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}
    if (!text) {
        return m.reply(`✎ Por favor, ingrese el nombre del plugin.`);
    }

    if (!m.quoted || !m.quoted.text) {
        return m.reply(`✎ Responda al mensaje con el contenido del plugin.`);
    }

    const ruta = `plugins/${text}.js`;
    
    try {
        await fs.writeFileSync(ruta, m.quoted.text);
        m.reply(`✎ Guardando plugin en ${ruta}`);
    } catch (error) {
        m.reply(`⚠️ Ocurrió un error al guardar el plugin: ${error.message}`);
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = ["saveplugin"];
handler.owner = true;

export default handler;