import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import moment from 'moment-timezone';

// Cargar la configuración externa desde config.js
const config = require('./config.js');  // Asegúrate de que la ruta sea correcta

global.owner = config.owners;   // Cargar los owners desde config.js
global.mods = config.mods;     // Cargar los mods desde config.js
global.suittag = config.suittag;
global.prems = config.prems;

let ownersDisabled = false;

// Handler para los comandos
const handler = async (m, { conn, command, isOwner }) => {
  // Si el comando es "poder0" y los comandos de owner no están deshabilitados, los desactivamos
  if (command === "poder0" && !ownersDisabled) {
    ownersDisabled = true;
    await m.reply("🔒 Todos los comandos de owner han sido deshabilitados. Usa *#poder1* para reactivarlos.");
    return;
  }

  // Si el comando es "poder1" y los comandos de owner están deshabilitados, los activamos
  if (command === "poder1" && ownersDisabled) {
    ownersDisabled = false;
    await m.reply("🔓 Los comandos de owner han sido habilitados nuevamente.");
    return;
  }

  // Si los comandos de owner están deshabilitados, no permitimos ejecutar comandos de owner
  if (ownersDisabled && isOwner) {
    return m.reply("❌ Los comandos de owner están deshabilitados. Usa *#poder1* para reactivarlos.");
  }

  // Ejemplo de comando que solo debería estar habilitado para los owners
  if (command === "autoadmin" && !isOwner) {
    return m.reply('❌ Este comando solo puede ser ejecutado por el owner.');
  }

  // Aquí puedes agregar más comandos específicos para los owners
};

// Usamos `handler.command` para definir los comandos que deben ser controlados
handler.command = ['poder0', 'poder1', 'autoadmin'];

// Comandos para owner
handler.owner = true;

// El plugin se actualiza cuando se cambia el archivo
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

export default handler;