import React from 'react';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">{recipe.name}</h2>
      <p className="mb-2"><strong>Description:</strong> {recipe.description}</p>
      <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p className="mb-2"><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p className="mb-2"><strong>Instructions:</strong> {recipe.instructions}</p>
      <p className="mb-2"><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
      <p className="mb-2"><strong>Prep Time:</strong> {recipe.prepTime}</p>
      <p className="mb-2"><strong>Servings:</strong> {recipe.servings}</p>
      <p className="mb-2"><strong>Nutrition Highlights:</strong> {recipe.nutritionHighlights}</p>
      <p className="mb-2"><strong>Chef Tips:</strong> {recipe.chefTips.join(', ')}</p>
      <p className="mb-2"><strong>Variations:</strong> {recipe.variations}</p>
      {/* Display the image if available */}
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} className="mt-4" />}
    </div>
  );
};

export default RecipeDetails;