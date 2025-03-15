const Expense = require("../models/Expense");
const User = require("../models/userModel");
const QRCode = require("qrcode");
const twilio = require("twilio");

// Twilio Config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
const twilioWhatsAppNumber = "whatsapp:+14155238886"; // Twilio sandbox number

// Add Expense Controller with WhatsApp + QR Code
const addExpense = async (req, res) => {
    try {
        const { title, amount, participants, paidBy } = req.body;
        
        if (!title || !amount || !participants || !paidBy) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Expense Creation
        const newExpense = new Expense({
            title,
            amount,
            participants,
            paidBy,
            shares: participants.map(user => ({
                user,
                amount: amount / participants.length, // Equal split
                paid: false
            }))
        });

        await newExpense.save();

        // Fetch Payer Details
        const payer = await User.findById(paidBy);
        if (!payer) {
            return res.status(404).json({ message: "Payer not found" });
        }

        // Fetch Participants Details (Phone Numbers)
        const participantUsers = await User.find({ _id: { $in: participants } });

        // WhatsApp Notifications
        for (const participant of participantUsers) {
            if (!participant.phone) continue; // Skip if phone is missing

            const amountOwed = (amount / participants.length).toFixed(2);
            const qrData = `upi://pay?pa=${payer.phone}@upi&pn=${payer.name}&mc=0000&tid=123456&tr=SplitPay_${newExpense._id}&tn=${title}&am=${amountOwed}&cu=INR`;

            // Generate QR Code
            const qrCodeUrl = await QRCode.toDataURL(qrData);

            // WhatsApp Message
            const message = `Hey *${participant.name}*, you owe *₹${amountOwed}* for *${title}*.  
🔹 Scan this QR to pay: [QR Image](${qrCodeUrl})  
🔹 Or confirm payment here: [Click to Mark Paid](http://yourfrontend.com/settle/${newExpense._id})`;

            await twilioClient.messages.create({
                from: twilioWhatsAppNumber,
                to: `whatsapp:+91${participant.phone}`,
                body: message
            });
        }

        res.status(201).json({ message: "Expense added & WhatsApp notifications sent", expense: newExpense });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addExpense };
