const express = require('express');
const { signup,loginUser } = require('../controllers/authController');

const router = express.Router();

// Login Route
router.post("/login", loginUser);
// signup Route
router.post('/signup', signup);

module.exports = router;