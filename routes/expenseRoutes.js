const express = require("express");
const { addExpense, getExpenses, settleExpense } = require("../controllers/expenseController");

const router = express.Router();


router.post("/add", addExpense);  
router.get("/", getExpenses); 
router.post("/settle/:expenseId", settleExpense);  
module.exports = router;
