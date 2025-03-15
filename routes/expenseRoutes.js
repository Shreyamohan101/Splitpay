const express = require("express");
const { addExpense, getExpenses, settleExpense } = require("../controllers/expenseController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getExpenses);
router.post("/settle/:expenseId", protect, settleExpense);

module.exports = router; 
