//let's apply this middleware to routes that need authentication....

const express = require("express");
const { getUserProfile } = require("../controllers/userController.js");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Protected route - Only logged-in users can access
router.get("/profile", getUserProfile);

module.exports = router;
