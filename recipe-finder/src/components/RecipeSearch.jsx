import React, { useState } from "react";
import { useSavedRecipes } from "./SavedRecipesContext";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecipeSearch.css";

const RecipeSearch = () => {
  const { addRecipe } = useSavedRecipes();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState(""); // For feedback to the user

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/recipes`, {
        params: { query },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const saveRecipe = async (recipe) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/save-recipe/`,
        recipe,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Recipe saved successfully!");
        addRecipe(recipe); // Update the saved recipes context
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessage("Failed to save the recipe. It may already be saved.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes"
        />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error messages */}
      <div className="main">
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                <Link to={`/recipe/${recipe.id}`}>More Info</Link>
                <button onClick={() => saveRecipe(recipe)}>
                  Add to Saved Recipes
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
