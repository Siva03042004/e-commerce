// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for internal navigation
import './Footer.css'; // Importing the CSS

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h1>Shop</h1>
          <Link to="/landing" className="footer-link">Shop Now</Link> {/* Using Link for internal navigation */}
        </div>
        <div className="footer-section">
          <h1>Follow Us</h1>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link-1">
            .<img src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" width="50" height="50"></img>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link-2">
            .<img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" width="50" height="50"></img>
          </a>
          {/* Additional social media links can be added here */}
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link-3">
            .<img src="https://img.icons8.com/?size=100&id=KxHlias9AgZt&format=png&color=000000" width="50" height="50"></img>
          </a>
        </div>
        <div className="footer-section">
          <h1>Company</h1>
          <Link to="/contact" className="footer-link">Contact Us</Link> {/* Using Link for internal navigation */}
          <Link to="/about" className="footer-link">About</Link> {/* Using Link for internal navigation */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
