const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: ["http://localhost:5173", "https://nominally-related-boa.ngrok-free.app"],
};
const symblAppId = process.env.SYMBL_APP_ID;
const symblAppSecret = process.env.SYMBL_APP_SECRET;
const symblApiBasePath = process.env.SYMBL_API_BASE_PATH || 'https://api.symbl.ai';

// Setup the proxy for backend requests
const targetUrl = process.env.NGROK_URL; // Use the Ngrok URL 
 app.use(cors(corsOptions));
 
// Middleware to parse JSON bodies
app.use(express.json());

// Proxy configuration
app.use('/api', createProxyMiddleware({
  target: 'https://nominally-related-boa.ngrok-free.app', // This should point to the Ngrok URL
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove the '/api' prefix when forwarding to the target URL!
  },
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-API-KEY");
  next();
});



// Team Chat Webhook route
app.post('/webhook', async (req, res) => {
  const { event, data } = req.body;

  // Process the webhook data (req.body) as needed
  console.log("ZCC Webhook:", req.body);
  // res.status(200).send("OK");

  if (!req.body) {
    return res.status(400).send('Invalid request: No body provided');
  }

  if (req.headers.authorization !== process.env.zoom_verification_token) {
    return res.status(401).send('Unauthorized request to Zoom Chatbot.');
  }

  // Respond to the webhook request
  res.send('Hello Zoom Contact Center!');
});

app.get('/welcome', (req, res) => {
  res.send('Hello from the backend server!');
});

app.get('/symbl-token', async (req, res) => {
  try {
    const response = await axios.post(`${symblApiBasePath}/oauth2/token:generate`, {
      type: 'application',
      appId: symblAppId,
      appSecret: symblAppSecret,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data).end();
  } catch (e) {
    console.error('Error while issuing Symbl Token.', e);
    res.status(401).json({ message: e.toString() }).end();
  }
});

// // Catch-all route to serve your frontend's index.html file
// app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(8081, () => console.log('Backend server running on port 8081'));
