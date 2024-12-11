import React, { createContext, useState, useContext } from "react";

// Create context
const SavedRecipesContext = createContext();

// Custom hook to use the context
export const useSavedRecipes = () => {
  return useContext(SavedRecipesContext);
};

// Provider component
export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const addRecipe = (recipe) => {
    // Avoid duplicates
    if (!savedRecipes.some((saved) => saved.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, addRecipe }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};
