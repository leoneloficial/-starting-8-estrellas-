let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, '✧ El usuario no se encuentra en la base de Datos.', m);
    }
    if (user.coin < 20) {
        return conn.reply(m.chat, '✧💔 Su saldó fue insuficiente para curarte. Necesitas al menos 20.', m);
    }
    let healAmount = 40; 
    user.health += healAmount;
    user.coin -= 20; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();
    let info = `✎❤️ *Te has curado ${healAmount} puntos de salud.*\n💸 *${moneda} restantes:* ${user.coin}\n❤️ *Salud actual:* ${user.health}`;
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar']

export default handler;
