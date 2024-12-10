import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="title">Recipe Finder</h1>
        <div className="navLinks">
          <Link to="/" className="link">
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
