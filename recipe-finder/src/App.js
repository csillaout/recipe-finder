import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeSearch from "./components/RecipeSearch";
import RecipeDetail from "./components/RecipeDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div class="full-page">
        <div class="carousel">
          <div class="carousel-content">
            <span class="emoji">🥬</span>
            <span class="emoji">🦐</span>
            <span class="emoji">🍆</span>
            <span class="emoji">🥦</span>
            <span class="emoji">🐓</span>
            <span class="emoji">🧀</span>
            <span class="emoji">🥩</span>
            <span class="emoji">🥔</span>
            <span class="emoji">🥬</span>
            <span class="emoji">🦐</span>
            <span class="emoji">🍆</span>
            <span class="emoji">🥦</span>
            <span class="emoji">🐓</span>
            <span class="emoji">🧀</span>
            <span class="emoji">🥩</span>
            <span class="emoji">🥔</span>
          </div>
        </div>
        <h1>What is in your kitchen?</h1>
        <p>
          If you dont know what to cook, just type some ingredients in the
          search bar and we will help you with some recipe ideas.
        </p>
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
