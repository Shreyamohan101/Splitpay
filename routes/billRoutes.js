const express = require("express");
const { createBill, getUserBills, markBillAsPaid } = require("../controllers/billController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes (user must be logged in)
router.post("/",  createBill); // Create a bill
router.get("/", getUserBills); // Get user’s bills
router.put("/:id/pay", markBillAsPaid); // Mark a bill as paid

module.exports = router;
