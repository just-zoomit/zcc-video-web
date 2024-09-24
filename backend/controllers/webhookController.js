const crypto = require('crypto');

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the directory to store the recordings
const recordingsDirectory = path.join(__dirname, '../recordings');

// Ensure the recordings folder exists
if (!fs.existsSync(recordingsDirectory)) {
  fs.mkdirSync(recordingsDirectory);
}

// Handler function for webhook events
const handleWebhookEvent = (req, res) => {
  const event = req.body.event;

  if (!event) {
    return res.status(400).send('Invalid request: No event provided');
  }

  switch (event) {
    case 'contact_center.recording_completed':
        handleRecordingCompleted(req, res);
      break;

    case 'contact_center.engagement_messaging_transcript_completed':
      handleMessagingTranscriptCompleted(req, res);
      break;

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


// Function to download and save the recording
const downloadRecording = async (downloadUrl, recordingId) => {
  const filePath = path.join(recordingsDirectory, `${recordingId}.mp4`);

  try {
    const response = await axios({
      method: 'get',
      url: downloadUrl,
      headers: { 
        'Authorization': `Bearer ${process.env.VITE_ZOOM_JWT_TOKEN}` // Use your JWT token or OAuth access token here
      },
      responseType: 'stream',
    });

    // Pipe the download to the file system
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading recording ${recordingId}:`, error);
  }
};
// Function to fetch recording details from Zoom API
const fetchRecordingDetails = async (nextPageToken = '') => {
    const config = {
      method: 'get',
      url: `https://api.zoom.us/v2/contact_center/recordings?next_page_token=${nextPageToken}`,
      headers: { 
        'Authorization': `Bearer ${process.env.VITE_ZOOM_JWT_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };
  
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recording details: `, error.response?.data?.message || error.message);
      return null;
    }
  };
  

// Handler for the "contact_center.recording_completed" event
const handleRecordingCompleted = async (req, res) => {
    console.log('Recording Completed Event:', req.body.payload);
    
    const recordingIdToFind = req.body.payload.object.recording_id;
    
    if (!recordingIdToFind) {
      return res.status(400).send('Recording ID not found in the payload');
    }
  
    console.log(`Received event for recording ID: ${recordingIdToFind}`);
    
    let nextPageToken = '';
    let recordingToDownload = null;
  
    // Loop through pages until the recording is found or no more pages are left
    while (!recordingToDownload) {
      const recordingDetails = await fetchRecordingDetails(nextPageToken);
  
      if (!recordingDetails || !recordingDetails.recordings) {
        console.error('No recordings found.');
        return res.status(404).send('No recordings found.');
      }
  
      // Find the recording that matches the recordingIdToFind in the current page of recordings
      recordingToDownload = recordingDetails.recordings.find(
        (recording) => recording.recording_id === recordingIdToFind
      );
  
      // If recording found, download it
      if (recordingToDownload) {
        if (recordingToDownload.download_url) {
          console.log(`Downloading recording with ID: ${recordingIdToFind}`);
          await downloadRecording(recordingToDownload.download_url, recordingIdToFind);
          console.log(`Recording ${recordingIdToFind} downloaded successfully.`);
          return res.status(200).send('Recording downloaded.');
        } else {
          console.error(`Download URL not found for recording ID: ${recordingIdToFind}`);
          return res.status(404).send('Download URL not found.');
        }
      }
  
      // If there's a next page, update the nextPageToken, otherwise break out of the loop
      nextPageToken = recordingDetails.next_page_token;
      if (!nextPageToken) {
        break;
      }
    }
  
    console.error(`Recording ID: ${recordingIdToFind} not found in any pages.`);
    return res.status(404).send('Recording not found.');
  };
  

  // Handler for user logout
const handleMessagingTranscriptCompleted= (req, res) => {
    const userData = req.body.payload; // Adjust based on actual payload structure
    console.log('Messaging Transcript Completed Event:', userData);
    // Implement your logic here
    res.status(200).send('Messaging Transcript Completed handled.');
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
  
  const getZoomAccessToken = async () => {
    const config = {
      method: 'post',
      url: `https://zoom.us/oauth/token?grant_type=client_credentials`,
      headers: {     
        'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`
      }
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Zoom access token:`, error);
      return null;
    }
    }


  module.exports = {
  handleWebhookEvent,
};