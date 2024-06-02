const express = require('express');
const { healthCheck } = require('../controllers/healthCheckController');

const router = express.Router();

router.get('/health', healthCheck);

module.exports = router;
