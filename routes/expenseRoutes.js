const express = require("express");
const { addExpense, getExpenses, settleExpense } = require("../controllers/expenseController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addExpense);  // Create an expense
router.get("/", protect, getExpenses);  // Get all expenses
router.patch("/settle/:expenseId", protect, settleExpense);  // Settle an expense ✅ (New Route)

module.exports = router;
