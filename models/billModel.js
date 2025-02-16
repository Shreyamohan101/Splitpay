const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Bill title (e.g., "Dinner at XYZ")
    amount: { type: Number, required: true }, // Total amount of the bill
    payer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who paid the bill
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // People involved in the bill
    settled: { type: Boolean, default: false }, // Whether the bill is paid
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
