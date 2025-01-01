import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-bar">
      <nav className="nav">
        <img src={logo} alt="logo" className="logo" />
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li className={`link ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`link ${location.pathname === '/about-us' ? 'active' : ''}`}>
            <Link to="/about-us">About Us</Link>
          </li>
          <li className={`link ${location.pathname === '/login-signup' ? 'active' : ''}`}>
            <Link to="/login-signup">Log In / Sign Up</Link>
          </li>
          <li className={`link ${location.pathname === '/profile' ? 'active' : ''}`}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={`link ${location.pathname === '/form-builder' ? 'active' : ''}`}>
            <Link to="/form-builder">Form Builder</Link>
          </li>
          <li>
            <button onClick={toggleTheme} className="btn dark-light-mode">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;