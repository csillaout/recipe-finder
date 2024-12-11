import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file
import { useSavedRecipes } from "./SavedRecipesContext";

const Header = () => {
  const { savedRecipes } = useSavedRecipes();

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="title">Recipe Finder</h1>
        <div className="navLinks">
          <Link to="/" className="link">
            Home |
          </Link>
          <Link to="/saved-recipes" className="link">
            Saved Recipes ({savedRecipes.length})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
