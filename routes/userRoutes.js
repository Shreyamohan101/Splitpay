const express = require("express");
const { getUserProfile } = require("../controllers/userController.js");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/profile", protect, getUserProfile); // Now protected

module.exports = router;
