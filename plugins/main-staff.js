let handler = async (m, { conn, args, command }) => {
  if (!args[0]) {
    // Si no hay argumento, mostrar los botones con los nombres del staff
    let buttons = [
      { buttonId: ".staff dueño", buttonText: { displayText: "👑 Dueño" }, type: 1 },
      { buttonId: ".staff zaphkiel", buttonText: { displayText: "✴️ Zaphkiel" }, type: 1 },
      { buttonId: ".staff piña", buttonText: { displayText: "🍍 Developer" }, type: 1 },
      { buttonId: ".staff rayo", buttonText: { displayText: "⚡ Developer" }, type: 1 },
      { buttonId: ".staff trebol", buttonText: { displayText: "☘️ Developer" }, type: 1 },
      { buttonId: ".staff moderador", buttonText: { displayText: "🔖 Moderador" }, type: 1 }
    ];

    let buttonMessage = {
      text: "✨ *EQUIPO STAFF DEL BOT*\n\nSelecciona un miembro para ver sus detalles:",
      footer: "👾 GitHub Bot",
      buttons: buttons,
      headerType: 1
    };

    return await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  } else {
    // Si hay argumento, mostrar la información del staff seleccionado
    let staffDetails = {
      dueño: { name: "👑 Dueño", role: "Creador", github: "https://github.com/TuGitHub" },
      zaphkiel: { name: "✴️ Zaphkiel", role: "Developer", github: "https://github.com/EnderJs-CreatorGL" },
      piña: { name: "🍍 Developer", role: "Developer", github: "https://github.com/TuGitHub" },
      rayo: { name: "⚡ Developer", role: "Developer", github: "https://github.com/TuGitHub" },
      trebol: { name: "☘️ Developer", role: "Developer", github: "https://github.com/TuGitHub" },
      moderador: { name: "🔖 Moderador", role: "Moderador", github: "https://github.com/TuGitHub" }
    };

    let selectedStaff = args[0]?.toLowerCase();
    if (staffDetails[selectedStaff]) {
      let { name, role, github } = staffDetails[selectedStaff];
      let response = `👤 *Nombre:* ${name}\n🔖 *Rol:* ${role}\n👾 *GitHub:* ${github}`;
      
      return await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    } else {
      return await m.reply("⚠️ No encontré ese miembro en el equipo.");
    }
  }
};

handler.command = ['staff'];
handler.register = true

export default handler;