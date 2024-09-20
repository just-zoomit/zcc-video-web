const crypto = require('crypto');

// Handler function for webhook events
const handleWebhookEvent = (req, res) => {
  const event = req.body.event;

  if (!event) {
    return res.status(400).send('Invalid request: No event provided');
  }

  switch (event) {
    case 'contact_center.user_logout':
      handleUserLogout(req, res);
      break;

    case 'contact_center.engagement_ended':
      handleEngagementEnded(req, res);
      break;

    case 'endpoint.url_validation':
      handleUrlValidation(req, res);
      break;

    default:
      console.warn(`Unhandled event type: ${event}`);
      res.status(200).send('Event received but not handled.');
  }
};

// Handler for user logout
const handleUserLogout = (req, res) => {
    const userData = req.body.payload; // Adjust based on actual payload structure
    console.log('User Logout Event:', userData);
    // Implement your logic here
    res.status(200).send('User logout handled.');
  };
  
  // Handler for engagement ended
  const handleEngagementEnded = (req, res) => {
    const engagementData = req.body.payload; // Adjust based on actual payload structure
    console.log('Engagement Ended Event:', engagementData);
    // Implement your logic here
    res.status(200).send('Engagement end handled.');
  };
  
  // Handler for URL validation (specific to Zoom webhook)
const handleUrlValidation = (req, res) => {
    const plainToken = req.body.payload.plainToken;
    const hashForValidate = crypto
      .createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN)
      .update(plainToken)
      .digest('hex');
    
    console.log('hashForValidate:', hashForValidate);
  
    res.json({
      plainToken: plainToken,
      encryptedToken: hashForValidate,
    });
  };

  module.exports = {
  handleWebhookEvent,
};