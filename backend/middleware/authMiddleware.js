
const crypto = require('crypto');

const verifyZoomAuthorization = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader !== process.env.ZOOM_VERIFICATION_TOKEN) {
    console.warn('Unauthorized request:', authorizationHeader);
    return res.status(401).send('Unauthorized request to Zoom Contact Center.');
  }

  // Handle URL validation if needed
  if (req.body.event === 'endpoint.url_validation') {
    return next();
  }

  next();
};

module.exports = {
  verifyZoomAuthorization,
};
