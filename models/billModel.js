const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    amount: { type: Number, required: true }, 
    payer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // People involved 
    settled: { type: Boolean, default: false }, //bill paid?
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
