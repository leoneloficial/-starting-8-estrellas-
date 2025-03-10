import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];
  let name = conn.getName(userId);
  let cumpleanos = user.birth || 'No especificado';
  let genero = user.genre || 'No especificado';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let coins = user.coin || 0;
  let role = user.role || '';

  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/RGury.jpg');

  let sender = m.sender.split("@")[0];

 /* let porcentajes = ["*Enviando mi menu 🪄*","*Listo* !"];

  for (let porcentaje of porcentajes) {
    await conn.sendMessage(m.chat, { text: ` ${porcentaje}` }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 500)); // Espera de 500ms entre cada mensaje
  }*/

  let txt = `
һ᥆ᥣᥲ! s᥆ᥡ *${botname}*
ᥲ𝗊ᥙí 𝗍іᥱᥒᥱs ᥣᥲ ᥣіs𝗍ᥲ ძᥱ ᥴ᥆mᥲᥒძ᥆s          
╭┈ ↷ 
│✰ Cliente » @${userId.split('@')[0]}
│⛁ ${moneda} » ${coins}
│☆ Experiencia » ${exp.toLocaleString()}
│❖ Nivel » ${nivel}
│✎ Rango » ${role}
│   ${dev}
╰๋͜┈ࠢ͜┅ࠦ͜͜╾݊͜─ؕ͜─ׄ͜─֬͜─֟͜─֫͜─ׄ͜─ؕ͜─݊͜┈ࠦ͜┅ࠡ͜͜┈࠭͜͜۰۰͜۰

✐; 💎→ ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ ᴜᴛɪʟɪᴢᴀ *#qr* o *#code

»  ⊹˚• \`Info-Bot\` •˚⊹
┈ࠢ͜┅ࠦ͜͜╾݊͜─ؕ͜─ׄ͜─֬͜─֟͜─֫͜─ׄ͜─ؕ͜─݊͜┈ࠦ͜┅ࠡ͜͜┈࠭͜͜۰۰͜۰
»  ⊹˚୨ •(=^●ω●^=)•  *Economy* ⊹

✐ Comandos de *Economia* para ganar dinero y divertirte con tus amigos.
✦ *#balance • #baltop*
→ Ver cuantos coins tienes.
✦ *#crime*
→ Ganar coins rapido.
✦ *#daily*
→ Reclamar tu recompensa diaria.
✦ *#deposit • #dep • #depositar • #d* + [cantidad] | all
→ Depositar tus coins en el banco.
✦  *#baltop* + <pagina>
→ Ver el ranking de usuarios con más Coin
✦  *#pay* + [usuario] [cantidad]
→ Dar coins a un usuario o exp.
✦ *#roulette • #rt* + [red/black] [cantidad]
→ Apostar coins en una ruleta.
✦ *#slut*
→ Ganar coins prostituyéndote.
✦ *#steal • #robar • #rob* + [@mencion]
→ Intentar robar coins a un usuario.
✦ *#retirar* + [cantidad] | all
→ Retirar tus coins en el banco.
✦ *#work • #w*
→ Ganar coins trabajando.
✦ *#banco*• *bank*
→ Ver tus coins en el Banco 
✦ *#casino  • #apostar*
→apuesta tus tenes en el casino 
✦ *#slot*
→ apuesta tus coins en la ruleta y prueba tu suerte 
✦ *#cartera • #wallet*
→Ver la cantidad de coins que caigas ensima
 ✦ *#minar • #miming • #mine*
→Trabaja como minero y recolecta recursos. 
✦ *#buyall •  #buy*
→compra tus coin con tu XP. 
✦ *#diario • daily*
→Reclama recompensa diaria. 
✦ *# cofre*
→Reclama un cofre diario lleno de recursos. 
✦ *# weekly • #semanal*
→ reclama tu regalo semanal. 
✦ *#monthly • #mensual
→reclama tu recompensa mensual.
✦ *#robar • #steal • #rob* 
→intenta robarle coni a alguien. 
✦ *#robarxp • #robxp*
→intentar robar XP a alguien. 
✦ *#aventura • #adventure*
→Aventurarse en un nuevo Reino y recolectar recursos. 
✦ *#curar • #heal*
→curar tu salud para volverte aventurar
✦ *#cazar • #hunt • #berburu*
→aventurate en una caza de animales
✦ *#inventario • #inv*
→ver tus inventario con todos tus ítems. 
✦ *#mazmorra • #explorar*
→Explorar mazmorras para ganar coin
✦ *#halloween*
→Reclama tu dulce o truco (solo en Halloween). 
✦ *christmas • #navidad*
→reclama tu regalo navideño (solo en navidad) 

»  ⊹˚୨ •(=^●ω●^=)•  *Download* ⊹

✐ Comandos de *Descarga* para descargar varios archivos.
✦ *#facebook • #fb* + [Link]
→ Descargar un video de Facebook
✦ *#mediafire • #mf*
→ Descargar un archivo de MediaFire
✦ *#mp4 • #ytmp4* + [Cancion]
→ Descargar un video de YouTube
✦ *#nhentai • #nh • #nhdl* + [id]
→ Descarga un doujin de nhentai
✦ *#pinterest • #pin* + [busqueda]
→ Buscar y descargar imagenes de Pinterest
✦ *#play • #yt • #ytaudio • #play4* + [Cancion]
→ Descargar una cancion de YouTube como audio o documento
✦ *#pornhub • #ph* + [Link]
→ Descargar un video de Pornhub
✦ *#reel • #ig • #instagram*
→ Descargar un reel de Instagram
✦ *#tiktok • #tt*
→ Descargar un video de TikTok
✦ *#twitter • #x* + [Link]
→ Descargar un video de Twitter/X
✦ *#vermangasporno • #vmp* + [url/id]
→ Descargar un manga de VerMangasPorno
✦ *#ytsearch • #search* + [busqueda]
→ Buscar videos de YouTube

»  ⊹˚୨ •(=^●ω●^=)•  *Gacha* ⊹

✐ Comandos de *Gacha* para reclamar y intercambiar personajes.
✦ *#charimage • #waifuimage • #cimage • #wimage* + [nombre]
→ Ver una imagen aleatoria de un personaje.
✦ *#charinfo • #winfo • #waifuinfo* + [nombre]
→ Ver información de un personaje.
✦ *#charvideo • #waifuvideo • #cvideo • #wvideo* + [nombre]
→ Ver un video aleatorio de un personaje.
✦ *#claim • #c • #reclamar* + {citar personaje}
→ Reclamar un personaje.
✦ *#delclaimmsg*
→ Restablecer el mensaje al reclamar un personaje
✦ *#deletewaifu • #delwaifu • #delchar* + [nombre]
→ Eliminar un personaje reclamado.
✦ *#favoritetop • #favtop*
→ Ver el top de personajes favoritos.
✦ *#gachainfo • #ginfo • #infogacha*
→ Ver tu información de gacha.
✦ *#giveallharem* + [@usuario]
→ Regalar todos tus personajes a otro usuario.
✦ *#givechar • #givewaifu • #regalar* + [@usuario] [nombre]
→ Regalar un personaje a otro usuario.
✦ *#harem • #waifus • #claims* + <@usuario>
→ Ver tus personajes rreclamadoS
✦ *#rollwaifu • #rw • #roll*
→ Waifu o husbando aleatorio
✦ *#serieinfo • #ainfo • #animeinfo* + [nombre]
→ Información de un anime.
✦ *#serielist • #slist • #animelist*
→ Listar series del bot
✦ *#setclaimmsg • #setclaim* + [mensaje]
→ Modificar el mensaje al reclamar un personaje
✦ *#trade • #intercambiar* + [Tu personaje] / [Personaje 2]
→ Intercambiar un personaje con otro usuario
✦ *#vote • #votar* + [nombre]
→ Votar por un personaje para subir su valor.
✦ *#waifusboard • #waifustop • #topwaifus* + [número]
→ Ver el top de personajes con mayor valor.

»  ⊹˚୨ •(=^●ω●^=)•  *Profile* ⊹

✐ Comandos de *Perfil*      para ver y configurar tu perfil.
✦ *#delbirth* + [fecha]
→ Borrar tu fecha de cumpleaños.
✦ *#delgenre*
→ Eliminar tu genero.
✦ *#divorce*
→ Divorciarte de tu  pareja.
✦ *#gp • #infogrupo*
→ Informacion del grupo.
✦  *#lb* + *#lboard* <Paginá>  
→ Top de usuarios con más experiencia.
✦ *#level • #lvl* + <@Mencion>
→ Ver tu nivel y experiencia actual.
✦ *#marry • #casarse* + <@Mencion>
→ Casarte con alguien.
✦ *#profile* + <@Mencion>
→ Ver tu perfil.
✦ *#setbirth* + [fecha]
→ Establecer tu fecha de cumpleaños.
✦ *#setdescription • #setdesc* + [Descripcion]
→ Establecer tu descripcion.
✦ *#setgenre* + Hombre | Mujer
→ Establecer tu genero. 
✦ *#comprarpremium • #premium*
→comprar un pase Premium sin límites
✦ #confesiones •  #confesar
→confiesa tus sentimientos a alguien de manera anónima


»  ⊹˚୨ •(=^●ω●^=)•  *Utils* ⊹

✐ Comandos *Utiles*
✦ *#bots • #sockets*
→ Ver el numero de bots activos.
✦ *#del • #delete* + {citar un mensaje}
→ Eliminar un mensaje.
✦ *#wm*
→ Restablecer el pack y autor por defecto para tus stickers.
✦ *#getpic • #pfp* + [@usuario]
→ Ver la foto de perfil de un usuario.
✦ *#join* + [Invitacion]
→ Invitar al bot a un grupo.
✦ *#menu • #help • #commands*
→ Ver el menú de comandos.
✦ *#ping • #p*
→ Medir tiempo de respuesta
✦ *#say* + [texto]
→ Repetir un mensaje
✦ *confi •  + [#on] | [#off]*
→ ver opciones de configuración de grupos ✦ *#status*
→ Ver estado del bot
✦ *#sticker • #s • #stickers* + {citar una imagen/video}
→ Convertir una imagen/video a sticker
✦ *#suggest • #add • #addanime • #report* + [Nombre]
→ Solicitar un anime/serie/juego o personaje faltante
✦ *#setwelcome • #setbye*
→ Prueba el mensaje de bienvenida/despedida.
✦ *#toimage • #toimg* + {citar sticker}
→ Convertir un sticker a imagen.

»  ⊹˚୨ •(=^●ω●^=)•  *Admin* ⊹

✦ *#alerts • #alertas* + [enable/disable]
→ Activar/desactivar las alertas de promote/demote
✦ *#antilink • #antienlace* 
→ Activar/desactivar el antienlace
✦ *#grupo abrir • #grupo cerrar*
→ Cerrar el grupo para que solo los administradores puedan enviar mensajes.
✦ *#demote* + <@usuario> | {mencion}
→ Descender a un usuario de administrador.
✦ *#goodbye •  #despedida* + [enable/disable]
→ Activar/desactivar la despedida
✦ *#groupimage • #groupimg • #gpimg • #setgroupimage*
→ Cambiar la imagen del grupo.
✦ *#kick* + <@usuario> | {mencion}
→ Expulsar a un usuario del grupo.
✦ *#nsfw* + [enable/disable]
→ Activar/desactivar los comandos NSFW
✦ *#onlyadmin • #onlyadmins* + [enable/disable]
→ Permitir que solo los administradores puedan utilizar los comandos.
✦ *#abrir grupo* 
→ Abrir el grupo para que todos los usuarios puedan enviar mensajes.
✦ *#promote* + <@usuario> | {mencion}
→ Ascender a un usuario a administrador.
✦ *#setbye* + [texto]
→ Establecer un mensaje de despedida personalizado.
✦ *#setwelcome* + [texto]
→ Establecer un mensaje de bienvenida personalizado.
✦ *#tag • #hidetag • #notify • #tagall* + [mensaje]
→ Envía un mensaje mencionando a todos los usuarios del grupo.
✦ *#welcome • #bienvenida* + [enable/disable]
→ Activar/desactivar la bienvenida

»  ⊹˚୨ •(=^●ω●^=)•  *Nsfw* ⊹

✐ Comandos *NSFW* (Contenido para adultos)
✦ *#anal* + <mencion>
 Hacer un anal
✦ *#waifu*
→Busca una waifu aleatorio. 
✦ *#bath* + <mencion>
→ Bañarse
✦ *#blowjob • #mamada • #bj* + <mencion>
→ Dar una mamada
✦ *#boobjob* + <mencion>
→ Hacer una rusa
✦ *#cum* + <mencion>
→ Venirse en alguien
✦ *#fap  + [mención]*
→ hacerse una paja
✦ *#ppcouople• #ppcp*
→ generar imágenes para amistades o parejas 
✦ *#fap* + <mencion>
→ Hacerse una paja
✦ *#footjob* + <mencion>
→ Hacer una paja con los pies
✦ *#fuck #fuck2 • #coger* + <mencion>
→ Follarte a alguien
✦ *#cafe • #coffe*+[mención]
→ tomate un cafecito con alguien
✦ *#grabboobs* + <mencion>
→ Agarrar tetas
✦ *#grop* + <mencion>
→ Manosear a alguien
✦ *#violar • #perra + [mencion]*
→violar a alguien
✦ *#lickpussy* + <mencion>
→ Lamer un coño
✦ *#rule34 • #r34* + [Tags]
→ Buscar imagenes en Rule34
✦ *#sixnine • #69* + <mencion>
→ Haz un 69 con alguien
✦ *#spank • #nalgada* + <mencion>
→ Dar una nalgada
✦ *#suckboobs* + <mencion>
→ Chupar tetas
✦ *#undress • #encuerar* + <mencion>
→ Desnudar a alguien
✦ *#yuri • #tijeras* + <mencion>
→ Hacer tijeras.

»  ⊹˚୨ •(=^●ω●^=)•  *Anime* ⊹

✐ Comandos de reacciones de anime.
✦ *#angry • #enojado* + <mencion>
→ Estar enojado
✦ *#bite* + <mencion>
→ Muerde a alguien
✦ *#bleh* + <mencion> 
→ Sacar la lengua
✦ *#blush* + <mencion>
→ Sonrojarte
✦ *#bored • #aburrido* + <mencion>
→ Estar aburrido
✦ *#cry* + <mencion>
→ Llorar por algo o alguien
✦ *#cuddle* + <mencion>
→ Acurrucarse
✦ *#dance* + <mencion>
→ Sacate los pasitos prohíbidos
✦ *#drunk* + <mencion>
→ Estar borracho
✦ *#eat • #comer* + <mencion>
→ Comer algo delicioso
✦ *#facepalm* + <mencion>
→ Darte una palmada en la cara
✦ *#happy • #feliz* + <mencion>
→ Salta de felicidad
✦ *#hug* + <mencion>
→ Dar un abrazo
✦ *#impregnate • #preg • #preñar* + <mencion>
→ Embarazar a alguien
✦ *#kill* + <mencion>
→ Toma tu arma y mata a alguien
✦ *#kiss • #muak* + <mencion>
→ Dar un beso
✦ *#laugh* + <mencion>
→ Reírte de algo o alguien
✦ *#lick* + <mencion>
→ Lamer a alguien
✦ *#love • #amor* + <mencion>
→ Sentirse enamorado
✦ *#pat* + <mencion>
→ Acaricia a alguien
✦ *#poke* + <mencion>
→ Picar a alguien
✦ *#pout* + <mencion>
→ Hacer pucheros
✦ *#punch* + <mencion>
→ Dar un puñetazo
✦ *#run* + <mencion>
→ Correr
✦ *#sad • #triste* + <mencion>
→ Expresar tristeza
✦ *#scared* + <mencion>
→ Estar asustado
✦ *#seduce* + <mencion>
→ Seducir a alguien
✦ *#shy • #timido* + <mencion>
→ Sentir timidez
✦ *#slap* + <mencion>
→ Dar una bofetada
✦ *#noches #nights* + <mencion>
→ Tumbarte a dormir
✦ *#smoke* + <mencion>
→ Fumar
✦ *#think* + <mencion>
→ Pensar en algo

»  ⊹˚୨ •(=^●ω●^=)•  *Script* ⊹

✐ Comandos para registrar tu propio bot.
✦ *#botinfo • #infobot*
→ Obtener informacion del bot
✦ *#join* + [Invitacion]
→ Unir al bot a un grupo
✦ *#leave • #salir*
→ Salir de un grupo
✦ *#logout*
→ Cerrar sesion del bot
✦ *#qr • #code*
→ Crear un Sub-Bot con un codigo QR/Code
✦ *#qrpremium • #codepremium* + [Token]
→ Crear un sub-bot premium
✦ *#qrtemporal • #codetemporal*
→ Crear un Sub-Bot temporal con un codigo QR/Code
✦ *#setbanner • #setmenubanner*
→ Cambiar el banner del menu
✦ *#setbotcurrency* + [nombre]
→ Cambiar la moneda del bot
✦ *#setname • #setbotname* + [nombre corto] / [nombre largo]
→ Cambiar el nombre del bot
✦ *#setpfp • #setimage*
→ Cambiar la imagen de perfil
✦ *#setstatus* + [estado]
→ Cambiar el estado del bot
✦ *#setusername* + [nombre]
→ Cambiar el nombre de usuario
  `.trim();

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });

};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true

export default handler;