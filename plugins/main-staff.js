let handler = async (m, { conn, args, command }) => {
  if (command === "staff") {
    let staff = [
      { id: "dueño", name: "👑 Dueño" },
      { id: "zaphkiel", name: "✴️ Zaphkiel" },
      { id: "piña", name: "🍍 Developer" },
      { id: "rayo", name: "⚡ Developer" },
      { id: "trebol", name: "☘️ Developer" },
      { id: "moderador", name: "🔖 Moderador" }
    ];

    let buttons = staff.map(member => ({
      buttonId: `.staff ${member.id}`,
      buttonText: { displayText: member.name },
      type: 1
    }));

    let buttonMessage = {
      text: "✨ *EQUIPO STAFF DEL BOT*\n\nSelecciona un miembro para ver sus detalles:",
      footer: "👾 GitHub Bot",
      buttons: buttons,
      headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  } else if (command === "staffinfo") {
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
      
      await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    } else {
      await m.reply("⚠️ No encontré ese miembro en el equipo.");
    }
  }
};

handler.command = ['staff', 'staffinfo'];

export default handler;