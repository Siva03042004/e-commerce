// eslint-disable-next-line no-unused-vars
import React from 'react';
import "../Styles/About.css";
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-background container">
      <h1 className="mb-4">About Us</h1>
      <p className="lead">
        Welcome to SEYON, your one-stop destination for premium laptops and mobile products.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            At SEYON, our mission is to empower our customers with the latest technology, 
            providing them with quality laptops and mobile devices that enhance their productivity and connectivity.
          </p>
        </div>
        <div className="col-md-6">
          <h2>Our Vision</h2>
          <p>
            We envision a world where technology is accessible to everyone, enabling seamless experiences 
            through innovative and user-friendly products.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>What We Offer</h2>
          <p>
            Our diverse range of products includes:
            <ul>
              <li>Laptops for every need: gaming, business, and personal use.</li>
              <li>Latest mobile devices with cutting-edge features.</li>
              <li>Accessories to enhance your tech experience.</li>
            </ul>
          </p>
        </div>
        <div className="col-md-6">
          <h2>Our Values</h2>
          <p>
            We are committed to:
            <ul>
              <li>Quality: Ensuring that every product meets our high standards.</li>
              <li>Customer Satisfaction: Providing exceptional service and support.</li>
              <li>Innovation: Continuously updating our offerings to include the latest technology.</li>
            </ul>
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2>Join Us on Our Journey</h2>
        <p>
          Thank you for choosing SEYON. Together, let’s explore the future of technology!
        </p>
        <Link to={'/contact'} className="contact-button">Contact Us</Link>
      </div>
    </div>
    </>
  );
};

export default About;
