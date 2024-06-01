import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import logo from '../../public/images/buddy-logo.svg';

export const Header = () => {
  const toggleNav = () => {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('open');
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/"><img src={logo} alt="Buddy Logo" /></Link>
        <nav className="mobile-nav">
          <button className="nav-toggle" aria-label="Open Navigation Menu" onClick={toggleNav}>☰</button>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find-buddy">Find your Buddy</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button>Login</button></li>
            <li><button>Sign up</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
