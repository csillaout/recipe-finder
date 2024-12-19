import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./RecipeDetail.css"; // Import the CSS file

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipe();
  }, [id]);
  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div class="recipedetail">
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>
      <Link to="/">Back to search</Link>
    </div>
  );
};
export default RecipeDetail;
