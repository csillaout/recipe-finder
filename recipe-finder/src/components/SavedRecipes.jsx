import React from "react";
import { useSavedRecipes } from "./SavedRecipesContext";
import { Link } from "react-router-dom";
import "./SavedRecipes.css";

const SavedRecipes = () => {
  const { savedRecipes } = useSavedRecipes();

  return (
    <div class="main">
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        <div class="recipes">
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe.id} class="recipe-card">
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
                <Link to={`/recipe/${recipe.id}`}>
                  <button>More Info</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
