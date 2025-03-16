const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            amount: Number,
            paid: { type: Boolean, default: false }
        }
    ],
    payerUpiId: { type: String, required: true } 
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
