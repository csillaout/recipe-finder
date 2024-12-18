import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Ensure useLocation is imported
import RecipeSearch from "./components/RecipeSearch";
import RecipeDetail from "./components/RecipeDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { SavedRecipes } from "./components/SavedRecipes";

import { SavedRecipesProvider } from "./components/SavedRecipesContext";

function AppContent() {
  const location = useLocation(); // useLocation must be inside a Router context

  let headerText = "What is in your kitchen?";
  let description =
    "If you don't know what to cook, just type some ingredients in the search bar and we will help you with some recipe ideas.";

  // Change text when on the saved recipes page
  if (location.pathname === "/saved-recipes") {
    headerText = "Here are your saved recipes. What will you cook today?";
    description = null; // No description for saved recipes page.
  }

  if (location.pathname.startsWith("/recipe/")) {
    headerText = null;
    description = null;
  }

  return (
    <div className="full-page">
      <div className="carousel">
        <div className="carousel-content">
          <span className="emoji">🥬</span>
          <span className="emoji">🦐</span>
          <span className="emoji">🍆</span>
          <span className="emoji">🥦</span>
          <span className="emoji">🐓</span>
          <span className="emoji">🧀</span>
          <span className="emoji">🥩</span>
          <span className="emoji">🥔</span>
        </div>
      </div>
      <h1>{headerText}</h1>
      {description && <p>{description}</p>}
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <SavedRecipesProvider>
      <Router>
        <Header />
        <AppContent /> {/* AppContent is wrapped within Router context */}
        <Footer />
      </Router>
    </SavedRecipesProvider>
  );
}

export default App;
