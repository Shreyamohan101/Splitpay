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
        const shares = participants.map(userId => ({ user: userId, amount: splitAmount, paid: false }));

        // Saving the expense
        const expense = new Expense({ title, amount, participants, shares, paidBy, settled: false });
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
        // Fetching all expenses where the user is involved
        const expenses = await Expense.find({
            $or: [
                { paidBy: req.user._id }, 
                { participants: req.user._id }
            ]
        });

        if (expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found" });
        }

        return res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to settle an expense
const settleExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { userId } = req.body; // User who is settling

        // Find the expense
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Find the user's share in the expense
        const share = expense.shares.find((s) => s.user.toString() === userId);

        if (!share) {
            return res.status(400).json({ message: "User not part of this expense" });
        }

        if (share.paid) {
            return res.status(400).json({ message: "Already settled" });
        }

        // Mark this user's share as paid
        share.paid = true;

        // Check if all participants have paid
        const allPaid = expense.shares.every((s) => s.paid);
        if (allPaid) {
            expense.settled = true;
        }

        // Save updated expense
        await expense.save();

        return res.json({
            message: allPaid ? "Expense fully settled" : "Payment recorded",
            expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addExpense, getExpenses, settleExpense };
