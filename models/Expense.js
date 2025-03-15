const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shares: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
      paid: { type: Boolean, default: false }, 
    },
  ],
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  settled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
