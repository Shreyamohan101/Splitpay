const express = require("express");
const { createBill, getUserBills, markBillAsPaid } = require("../controllers/billController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes
router.post("/", protect, createBill); 
router.get("/", protect, getUserBills); 
router.put("/:id/pay", protect, markBillAsPaid); 

module.exports = router;
