// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import auth from '../Config/firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutfunc = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <h1 className="navbar-logo">SEYON</h1>
      
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/landing" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/product" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
        <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
        <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
        <li>
          <button className='logoutbtn' onClick={logoutfunc}>Logout</button>
        </li>
        <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu">X</button>
      </ul>

      <div className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
