// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/Navbar';
import Products from './Products';
import Footer from '../Components/Footer';
import '../Styles/Landing.css'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <h1 className='welcome'>Welcome to SEYON</h1>
        <p className='content'>Your number one source for all things product.</p>
        <button className="explore-button">Explore Now</button>
      </div>
      <Products />
      <Footer />
    </>
  );
};

export default Landing;
