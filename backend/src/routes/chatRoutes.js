const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST - Add message
router.post('/add-message', chatController.addMessage);

// GET - Get chat history
router.get('/get-chat/:userId', chatController.getChat);

module.exports = router;
