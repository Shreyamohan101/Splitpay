const Bill = require("../models/billModel");

// Create a new bill
const createBill = async (req, res) => {
    try {
        const { title, amount, participants } = req.body;

        // Validate required fields
        if (!title || !amount || !participants || participants.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure amount is a positive number
        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than zero" });
        }

        // Ensure participants is an array
        if (!Array.isArray(participants)) {
            return res.status(400).json({ message: "Participants should be an array" });
        }

        const bill = await Bill.create({
            title,
            amount,
            payer: req.user._id,
            participants,
        });

        res.status(201).json({ message: "Bill created successfully", bill });
    } catch (error) {
        res.status(500).json({ message: "Error creating bill", error: error.message });
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
        res.status(500).json({ message: "Error fetching bills", error: error.message });
    }
};

// Mark a bill as paid
const markBillAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the bill in a single query
        const bill = await Bill.findByIdAndUpdate(id, { settled: true }, { new: true });

        if (!bill) return res.status(404).json({ message: "Bill not found" });

        res.status(200).json({ message: "Bill marked as paid", bill });
    } catch (error) {
        res.status(500).json({ message: "Error updating bill", error: error.message });
    }
};

module.exports = { createBill, getUserBills, markBillAsPaid };
