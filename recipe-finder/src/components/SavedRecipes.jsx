import React, { useState } from "react";
import { useSavedRecipes } from "./SavedRecipesContext";
import { Link } from "react-router-dom";
import "./SavedRecipes.css";

export const SavedRecipes = () => {
  const { savedRecipes } = useSavedRecipes();

  return (
    <div className="main">
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        <div className="recipes">
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe.id} className="recipe-card">
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

export const RecipeCard = ({ recipe }) => {
  const [message, setMessage] = useState("");

  const saveRecipe = async () => {
    try {
      const response = await fetch("http://localhost:8000/save-recipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const error = await response.json();
        setMessage(error.detail);
      }
    } catch (error) {
      setMessage("An error occurred while saving the recipe.");
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <button onClick={saveRecipe}>Save Recipe</button>
      {message && <p>{message}</p>}
    </div>
  );
};
