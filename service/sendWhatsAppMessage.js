const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: "whatsapp:",  // Twilio Sandbox Number
            to: `whatsapp:+${to}`, // Ensure it's in international format (e.g., +919876543210)
        });
        console.log(" WhatsApp Message Sent:", response.sid);
    } catch (error) {
        console.error(" WhatsApp Message Error:", error);
    }
};

module.exports = sendWhatsAppMessage;
