const Bill = require("../models/billModel");

// Create a new bill
const createBill = async (req, res) => {
    try {
        const { title, amount, participants } = req.body;
        if (!title || !amount || participants.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const bill = await Bill.create({
            title,
            amount,
            payer: req.user._id,
            participants,
        });

        res.status(201).json({ message: "Bill created successfully", bill });
    } catch (error) {
        res.status(500).json({ message: "Error creating bill", error });
    }
};

// Get bills where the user is involved
const getUserBills = async (req, res) => {
    try {
        const bills = await Bill.find({
            $or: [{ payer: req.user._id }, { participants: req.user._id }],
        }).populate("payer", "name email").populate("participants", "name email");

        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bills", error });
    }
};

// Mark a bill as paid
const markBillAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        const bill = await Bill.findById(id);
        if (!bill) return res.status(404).json({ message: "Bill not found" });

        bill.settled = true;
        await bill.save();

        res.status(200).json({ message: "Bill marked as paid", bill });
    } catch (error) {
        res.status(500).json({ message: "Error updating bill", error });
    }
};

module.exports = { createBill, getUserBills, markBillAsPaid };


