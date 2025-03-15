const express = require("express");
const { createBill, getUserBills, markBillAsPaid } = require("../controllers/billController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes
router.post("/", protect, createBill); // Create a bill
router.get("/", protect, getUserBills); // Get user’s bills
router.put("/:id/pay", protect, markBillAsPaid); // Mark a bill as paid

module.exports = router;
