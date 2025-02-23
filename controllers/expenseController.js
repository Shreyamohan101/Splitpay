const Expense = require("../models/Expense");

// Function to add an expense
const addExpense = async (req, res) => {
    try {
        const { title, amount, participants } = req.body;
        const paidBy = req.user._id; // The authenticated user who is paying

        if (!title || !amount || participants.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Calculate each participant's share
        const splitAmount = amount / participants.length;
        const shares = participants.map(userId => ({ user: userId, amount: splitAmount }));

        // Saving the expense
        const expense = new Expense({ title, amount, participants, shares, paidBy });
        await expense.save();

        return res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to get all expenses of the authenticated user
const getExpenses = async (req, res) => {
    try {
        // Fetching all expenses paid by the authenticated user
        const expenses = await Expense.find({ paidBy: req.user._id });

        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found" });
        }

        return res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addExpense, getExpenses };
