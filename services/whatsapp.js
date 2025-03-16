const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState } = require("@whiskeysockets/baileys");

let sock; // WhatsApp socket instance

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    sock = makeWASocket({ auth: state, printQRInTerminal: true });

    sock.ev.on("connection.update", async (update) => {
        const { connection, qr } = update;
        if (qr) console.log(" Scan this QR Code to login!");
        if (connection === "open") console.log(" Successfully connected to WhatsApp!");
        else if (connection === "close") {
            console.log(" Connection closed! Retrying...");
            connectToWhatsApp();
        }
    });

    sock.ev.on("creds.update", saveCreds);
}

// baileys se WhatsApp message bhejne ka function
async function sendWhatsAppMessage(to, message) {
    if (!sock) {
        console.error(" WhatsApp not connected yet!");
        return;
    }

    try {
        await sock.sendMessage(to + "@s.whatsapp.net", { text: message });
        console.log(` Message sent to: ${to}`);
    } catch (error) {
        console.error(" Error sending message:", error);
    }
}

module.exports = { connectToWhatsApp, sendWhatsAppMessage };
