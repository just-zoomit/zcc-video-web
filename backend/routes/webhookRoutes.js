const express = require('express');
const router = express.Router();
const { handleWebhookEvent } = require('../controllers/webhookController');

// Webhook POST route
router.post('/webhook', handleWebhookEvent);

module.exports = router;