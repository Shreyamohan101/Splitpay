const QRCode = require("qrcode");
const Expense = require("../models/Expense");
const User = require("../models/userModel");

const { connectToWhatsApp, sendWhatsAppMessage } = require("../services/whatsapp");

const addExpense = async (req, res) => {
    try {
        const { title, amount, participants, paidBy, payerUpiId } = req.body;

        if (!title || !amount || !participants || !paidBy || !payerUpiId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const payer = await User.findById(paidBy);
        if (!payer || !payer.phone) {
            return res.status(404).json({ message: "Payer not found or phone number missing" });
        }

    

        const newExpense = new Expense({
            title,
            amount,
            participants,
            paidBy,
            payerUpiId,
            shares: participants.map(user => ({
                user,
                amount: amount / participants.length,
                paid: false
            }))
        });

        await newExpense.save();

        const participantUsers = await User.find({ _id: { $in: participants } });

        //  send whatsapp messages only if whatsApp is linked....still needs to be refined>
        for (const participant of participantUsers) {
            if (!participant.phone || participant._id.toString() === paidBy) continue; //not for payer

            const amountOwed = (amount / participants.length).toFixed(2);
            const upiUrl = `upi://pay?pa=${payerUpiId}&pn=${payer.name}&am=${amountOwed}&cu=INR&tn=${title}`;
            const qrCodeData = await QRCode.toDataURL(upiUrl);

            const message = ` *SplitPay Expense here* \n\n` +
                `Heya *${participant.name}*, you owe *₹${amountOwed}* for *${title}*.\n\n` +
                `🔹 *Payer:* ${payer.name} (${payer.phone})\n` +
                `🔹 *Amount:* ₹${amountOwed}\n\n` +
                `📲 *Scan & Pay:* [Click Here](${upiUrl})\n\n` +
                `✔️ *After paying, mark it here:* [Settle Bill](http://yourfrontend.com/settle/${newExpense._id})`;

            // send wtsp message using payer linked account
            await sendWhatsAppMessage(participant.phone, message);
            await sendWhatsAppMessage(participant.phone, { image: { url: qrCodeData }, caption: "Scan & Pay via UPI!" });
        }

        res.status(201).json({
            message: "Expense added & WhatsApp notifications sent from Payer's WhatsApp",
            expense: newExpense
        });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//get all expenses *
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate("participants", "name phone")
            .populate("paidBy", "name phone");

        res.status(200).json(expenses);
    } catch (error) {
        console.error(" Error fetching expenses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//  Settle an expense
const settleExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { userId } = req.body;

        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        const share = expense.shares.find(share => share.user.toString() === userId);
        if (!share) {
            return res.status(400).json({ message: "User not part of this expense" });
        }

        share.paid = true;
        await expense.save();

        res.status(200).json({ message: "Expense settled successfully", expense });
    } catch (error) {
        console.error(" Error settling expense:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addExpense, getExpenses, settleExpense };
