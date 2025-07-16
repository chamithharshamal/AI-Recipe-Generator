import React, { useEffect, useState } from 'react';
import recipeService from '../../services/recipeService';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const savedRecipes = await recipeService.getSavedRecipes();
      setRecipes(savedRecipes);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Saved Recipes</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="mb-2">
              <h3 className="text-xl">{recipe.name}</h3>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeList;