const express = require("express");
const app = express();
const axios = require('axios');
const cors = require("cors");

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ["http://localhost:5173", "https://nominally-related-boa.ngrok-free.app"].includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

require('dotenv').config();

const symblAppId = process.env.SYMBL_APP_ID;
const symblAppSecret = process.env.SYMBL_APP_SECRET;
const symblApiBasePath = process.env.SYMBL_API_BASE_PATH || 'https://api.symbl.ai';

// Setup the proxy for backend requests
// const targetUrl = process.env.NGROK_URL; // Use the Ngrok URL 
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple"] });
});

// Team Chat Webhook route
app.post('/webhook', async (req, res) => {

  // Process the webhook data (req.body) as needed
  console.log("ZCC Webhook:", req.body);
  // res.status(200).send("OK");

  if (!req.body) {
    return res.status(400).send('Invalid request: No body provided');
  }

  if (req.headers.authorization !== process.env.zoom_verification_token) {
    console.log("req.headers.authorization", req.headers.authorization);
    return res.status(401).send('Unauthorized request to Zoom Chatbot.');
  }

  // Respond to the webhook request
  res.send('Hello Zoom Contact Center!');
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

app.listen(8080, () => {
  console.log("Server started on port 8080");
});