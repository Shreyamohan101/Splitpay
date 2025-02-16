const express = require('express');
const { signup, login } = require('../controllers/authController.js');

const router = express.Router();

//I am using MVC pattern ....
router.post("/signup",signup);
router.post("/login", login);

module.exports = router;