import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css';
import logo from '../assets/movie-logo-text.png';



const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-logo" to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-links">
        <input type="text" placeholder="Search movies..." className="navbar-search" />
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">Tv Shows</Link>
          <Link to="/streaming-service">Streaming Service</Link>
        </div>
      </nav>
    );
  };

export default Navbar;