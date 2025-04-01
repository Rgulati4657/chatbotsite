const express = require('express');
const { home } = require('../controllers/generalController');

const router =  express.Router();

router.get('/' , home);

module.exports = router;