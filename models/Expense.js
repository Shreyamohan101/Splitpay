const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, amount: Number }],
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
