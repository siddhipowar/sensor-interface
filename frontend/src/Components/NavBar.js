import React from 'react';
//import './Navbar.css'; // You can create a separate CSS file for styling
// import Logo from '../../public/quanergy.jpg'; // Import your logo image
import '../App.css'

function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/images/quanergy_logo.jpg" alt="Logo" className="logo" />
        </div>
        {/* <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/about">About</a>
          </li>
          <li className="navbar-item">
            <a href="/contact">Contact</a>
          </li>
        </ul> */}
      </nav>
    );
  }
  
  export default Navbar;
  