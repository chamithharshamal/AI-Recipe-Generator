import React, { createContext, useState } from 'react';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const removeRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };