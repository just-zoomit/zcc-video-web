import React, { useState, useEffect } from 'react';
import Navbar from './home-components/Navbar';
import Hero from './home-components/Hero';
import Features from './home-components/Features';
import Testimonials from './home-components/Testimonials';
import Team from './home-components/Team';

// import SupportEngine from '../SupportEngine';
import ContactCenter from './ContactCenter';

import './index.css';
import Footer from './home-components/Footer';


const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?count=6', {
          headers: {
            Authorization: `Client-ID YOUR_UNSPLASH_ACCESS_KEY`
          }
        });
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images from Unsplash', error);
      }
    };

    // fetchImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Features images={images} />
      <Testimonials images={images} />
      <Team images={images} />
      <Footer images={images} />
      <ContactCenter />
    
     
    </div>
  );
};

export default Home;
