const express = require('express');
const router = express.Router();
const { validateDomain } = require('../controllers/domainController');

// Route: POST /api/domain/validate
router.post('/validate', validateDomain);

module.exports = router;
