import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  let staff = [
    { name: "Dueño", role: "Creador", github: "https://github.com/TuGitHub" },
    { name: "Zaphkiel", role: "Developer", github: "https://github.com/EnderJs-CreatorGL" },
    { name: "🍍", role: "Developer", github: "https://github.com/TuGitHub" },
    { name: "⚡", role: "Developer", github: "https://github.com/TuGitHub" },
    { name: "☘️", role: "Developer", github: "https://github.com/TuGitHub" },
    { name: "Moderador", role: "Moderador", github: "https://github.com/TuGitHub" }
  ];

  let buttons = staff.map(member => ({
    buttonId: `staff_${member.name.toLowerCase()}`,
    buttonText: { displayText: member.name },
    type: 1
  }));

  let buttonMessage = {
    text: "✨ *EQUIPO STAFF OWNERS DEL BOT*\n\nSelecciona un miembro para ver sus detalles:",
    footer: "👾 GitHub Bot",
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = ['ayudantes', 'colaboradores', 'staff'];

export default handler;