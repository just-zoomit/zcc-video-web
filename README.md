# Node Backend + (React + Vite)  Frontend

This repo is an example Backend Express/Node with connected  React + Vite Frontend Project 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)
- A Zoom Contact Center license and API key
- A [Symbl.ai](https://symbl.ai/) account and API Key 

## The stack includes:

- [React + Vite ](https://vitejs.dev/guide/) for frontend
- [Node.JS](https://nodejs.org/en)


## Configuration

Create a `.env` file in the root directory and add the following:

```bash
SYMBL_APP_ID= YOUR_SYMBL_APP_ID
SYMBL_APP_SECRET= YOUR_SYMBL_APP_SECRET

REACT_APP_SYMBL_TOKEN_ENDPOINT=YOUR_REACT_APP_SYMBL_TOKEN_ENDPOINT

ZOOM_VERIFICATION_TOKEN=YOUR_ZOOM_VERIFICATION_TOKEN
ZOOM_WEBHOOK_SECRET_TOKEN=YOUR_ZOOM_WEBHOOK_SECRET_TOKEN
NGROK_URL=YOUR_NGROK_URL

VITE_CE_PRIVATE_KEY=YOUR_VITE_CE_PRIVATE_KEY
VITE_CE_PROJECT_ID=YOUR_VITE_CE_PROJECT_ID
VITE_API_KEY_ZCC_ENTRYID=YOUR_VITE_API_KEY_ZCC_ENTRYID
VITE_API_KEY_ZCC_DATA_API_KEY=YOUR_VITE_API_KEY_ZCC_DATA_API_KEY

VITE_ZOOM_JWT_TOKEN=EXAMPLE_ZTC_TOKEN
```

### Start your Ngrok

Zoom Contact Center do not support localhost, and must be served over https.  To develop locally, you need to tunnel traffic to this application via https. You can use Ngrok to do this. Once installed you may run this command from your terminal:

```bash
ngrok http 5173
```

Ngrok will output the origin it has created for your tunnel, eg `https://9a20-38-99-100-7.ngrok.io`. You'll need to use to access your site over https. 


### Setup in Zoom Marketplace app build flow

The Zoom Marketplace build flow for a Zoom App may be found [here](https://marketplace.zoom.us/develop/create).  You will need a developer account with Zoom Apps enabled.

The following are steps to take in each of the tabs in the build flow . . .

Replace credentials with your actual Zoom Marketplace App and Sybml API key and secret.

## Getting Started

Run the app locally with
```bash

# Clone down this repository (NOT ACTICE YET)
git clone git@github.com/zoom/zcc-react-vite

# navigate into the cloned project directory
cd zcc-react-vite

# run NPM to install the app dependencies
npm install

# start the ngrok instance
ngrok http 5173

# start and navigate to ngrok url
$ npm run dev
```

This will start the local token server and run the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to see the application in the browser.

The token server runs on port 8081 exposes two `GET` endpoints. One to generate access token for Symbl and one for generating access token for Twilio. 

Symbl token endpoint expects `GET` request at `/symbl-token` route with no parameters.

The response will be a JSON response with `accessToken` and `expiresIn` values with Symbl access token and expiry of token.

## Generate access token for Symbl  
Try it out with this sample `curl` command:

```bash
curl 'localhost:8080/symbl-token'
```


### API Reference

For detailed information about the AI-powered Zoom Contact Center, please refer to the [official documentation](https://developers.zoom.us/docs/contact-center/).

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the [MIT License](LICENSE).

