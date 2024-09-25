/* globals VideoClient */
import { useEffect, useRef } from 'react';

const ContactCenter = () => {
  const contactCenterIconRef = useRef(null);


  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement('script');
    script.src = 'https://us01ccistatic.zoom.us/us01cci/web-sdk/video-client.js';
    script.setAttribute('data-entry-id', import.meta.env.VITE_API_KEY_ZCC_ENTRYID); // Replace with .env variable
    script.setAttribute('data-env', 'us01');
    script.setAttribute('data-apikey', import.meta.env.VITE_CE_PRIVATE_KEY); // Replace with .env variable
    script.async = true;
    document.body.appendChild(script);

    console.log('Script loaded');

    // Handle script load and attach event listener
    script.onload = () => {
      const dom = contactCenterIconRef.current;
      console.log('Script loaded and attached to DOM', dom);
      if (dom) {
        dom.addEventListener('click', async () => {
          const entryId = import.meta.env.VITE_API_KEY_ZCC_ENTRYID; // Replace with .env variable
          const videoClient = new VideoClient();

          await videoClient.init({
            entryId,
            name: 'name', // Optional: Replace 'name' or omit if not needed!
          });

          videoClient.startVideo();

          videoClient.on('video-end', () => {
            console.log('video ended'); // Action when the video ends
          });
        });
      }
    };

    return () => {
      // Clean up the script and event listener when component unmounts
      document.body.removeChild(script);
      if (contactCenterIconRef.current) {
        contactCenterIconRef.current.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <div>
    
      <div id="contact-center-icon" ref={contactCenterIconRef}>
        {/* Your icon goes here */}
    
      </div>
    </div>
  );
};

export default ContactCenter;
