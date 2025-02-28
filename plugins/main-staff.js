import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  let staff = [
    { id: "dueño", name: "👑 Dueño", role: "Creador", github: "https://github.com/TuGitHub" },
    { id: "zaphkiel", name: "✴️ Zaphkiel", role: "Developer", github: "https://github.com/EnderJs-CreatorGL" },
    { id: "piña", name: "🍍", role: "Developer", github: "https://github.com/TuGitHub" },
    { id: "rayo", name: "⚡", role: "Developer", github: "https://github.com/TuGitHub" },
    { id: "trebol", name: "☘️", role: "Developer", github: "https://github.com/TuGitHub" },
    { id: "moderador", name: "🔖 Moderador", role: "Moderador", github: "https://github.com/TuGitHub" }
  ];

  let buttons = staff.map(member => ({
    buttonId: `.staffinfo ${member.id}`, 
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
};

handler.command = ['ayudantes', 'colaboradores', 'staff'];

export default handler;