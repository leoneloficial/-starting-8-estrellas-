import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

// Función para obtener JSON con mejor manejo de errores
const fetchJson = async (url, options = {}) => {
    try {
        console.log(`📡 Fetching URL: ${url}`);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`🌐 Error HTTP: ${response.status}`);
        const json = await response.json();
        console.log("✅ Respuesta de la API:", JSON.stringify(json, null, 2)); // Log detallado de la respuesta
        return json;
    } catch (error) {
        console.error("❌ Error en fetchJson:", error);
        return null;
    }
}

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            console.log("《✧》 No se proporcionaron emojis.");
            return m.reply(`✎ Ejemplo: *${usedPrefix + command}* 😎+🤑`);
        }

        let [emoji, emoji2] = text.split`+`;
        if (!emoji || !emoji2) {
            console.log("《✧》 Entrada inválida, faltan emojis.");
            return m.reply("《✧》 Debes ingresar dos emojis separados por '+'.");
        }

        console.log(`「✿」 Buscando combinación: ${emoji} + ${emoji2}`);

        let apiUrl = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`;

        let anu = await fetchJson(apiUrl);

        if (!anu || !anu.results || anu.results.length === 0) {
            console.log("⚠️ No se encontraron resultados en la API.");
            return m.reply("❌ No se encontró una combinación para esos emojis.");
        }

        for (let res of anu.results) {
            console.log(`📥 Descargando sticker de: ${res.url}`);
            let stiker = await sticker(false, res.url, global.packname, global.author);

            if (stiker) {
                console.log("✅ Sticker creado correctamente.");
                await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);
            } else {
                console.log("❌ Error al crear sticker.");
                m.reply("❌ Ocurrió un error al generar el sticker.");
            }
        }
    } catch (err) {
        console.error("❌ Error en handler:", err);
        m.reply("❌ Ocurrió un error interno, por favor intenta nuevamente.");
    }
}

handler.help = ['emojimix *<emoji+emoji>*']
handler.tags = ['sticker']
handler.command = ['emojimix']
handler.register = true

export default handler;