import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const navLinks = [
  { title: 'Home', url: '/' },
  { title: 'Career Guide', url: '/career-guide' },
  { title: 'Resume Builder', url: '/resume-builder' },
  { title: 'Roadmap Builder', url: '/roadmap-builder' },
  { title: 'Interview Assistance', url: '/interview-assistance' },
  { title: 'Day In Life', url: '/day-in-life' }
];

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={require('../assets/logo.png')}
          alt="Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Career Compass</span>
      </div>
      <div className="navbar-right">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.url} className="navbar-link">
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
