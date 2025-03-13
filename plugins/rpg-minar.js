let cooldowns = {}

let handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];
if (!user) return;

let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
let time = user.lastmiming + 600000;

if (new Date() - user.lastmiming < 600000) {
return conn.reply(m.chat, `${emoji3} Debes esperar ${msToTime(time - new Date())} para volver a minar.`, m);
}

let hasil = Math.floor(Math.random() * 1000);
let info = `⛏️ *Te has adentrando en lo profundo de las cuevas*\n\n` +
`> *🍬 Obtuviste estos recursos*\n\n` +
`✨ *Exp*: ${hasil}\n` +
`💸 *${moneda}*: ${coin}\n`;

await conn.reply(m.chat, info, fkontak)
await m.react('⛏️');

user.pickaxedurability -= 30;
user.coin += coin;
user.lastmiming = new Date() * 1;
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes < 10) ? '0' + minutes : minutes;
seconds = (seconds < 10) ? '0' + seconds : seconds;

return minutes + ' m y ' + seconds + ' s ';
}