
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

  return (
    <div>
      <Navbar />
      <Hero />
      <Features  />
      <Testimonials />
      <Team  />
      <Footer />
      <ContactCenter />
    
     
    </div>
  );
};

export default Home;
