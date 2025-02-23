const express = require("express");
const { addExpense, getExpenses } = require("../controllers/expenseController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addExpense);  // Create an expense
router.get("/", protect, getExpenses);  // Get all expenses

module.exports = router;
