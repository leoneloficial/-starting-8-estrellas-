import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import moment from 'moment-timezone';

// Cargar la configuración externa desde config.js
import config from './config.js';

// Usamos la configuración del archivo config.js
global.owner = config.owner;
global.mods = config.mods;
global.suittag = config.suittag;
global.prems = config.prems;

let ownersDisabled = global.ownersDisabled; // Usamos la variable de estado de desactivación

let handler = async (m, { conn, command, isOwner }) => {

  // Si los comandos de owner están desactivados, no se ejecutan
  if (ownersDisabled && isOwner) {
    return m.reply("❌ Los comandos de owner están deshabilitados temporalmente.");
  }

  // Comando para desactivar los comandos de owner
  if (command === "desactivarOwners" && isOwner) {
    global.ownersDisabled = true; // Desactivar comandos de owner
    ownersDisabled = true;
    return m.reply("🔒 Todos los comandos de owner han sido deshabilitados temporalmente. Los cambios solo se restablecerán tras reiniciar el bot.");
  }

  // Comando para activar los comandos de owner (esto sería para restablecer en caso de reinicio o pruebas)
  if (command === "restaurarOwners" && isOwner) {
    global.ownersDisabled = false; // Restaurar comandos de owner
    ownersDisabled = false;
    return m.reply("🔓 Los comandos de owner han sido restaurados.");
  }

  // Aquí el resto de comandos de owner

};

// Usamos handler.command para definir los comandos de este handler
handler.command = ['desactivarOwners', 'restaurarOwners'];

handler.owner = true; // Solo para owners

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

export default handler;