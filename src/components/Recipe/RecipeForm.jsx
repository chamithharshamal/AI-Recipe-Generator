import React, { useState } from 'react';
import recipeService from '../../services/recipeService';

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [servings, setServings] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [avoidIngredients, setAvoidIngredients] = useState('');
  const [season, setSeason] = useState('');
  const [mealType, setMealType] = useState('');
  const [recipe, setRecipe] = useState(null);

  const cuisineTypes = [
    { value: "italian", label: "Italian" },
    { value: "asian", label: "Asian" },
    { value: "mexican", label: "Mexican" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "american", label: "American" },
    { value: "indian", label: "Indian" },
    { value: "french", label: "French" },
    { value: "middle_eastern", label: "Middle Eastern" },
    { value: "other", label: "Other" }
  ];

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten_free", label: "Gluten Free" },
    { value: "dairy_free", label: "Dairy Free" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "low_carb", label: "Low Carb" },
    { value: "high_protein", label: "High Protein" }
  ];

  const seasons = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "autumn", label: "Autumn" },
    { value: "winter", label: "Winter" }
  ];

  const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
    { value: "dessert", label: "Dessert" }
  ];

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    try {
      // Split the ingredients by comma and trim whitespace
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
      const avoidIngredientList = avoidIngredients.split(',').map(ingredient => ingredient.trim());

      const generatedRecipe = await recipeService.generateRecipe({
        ingredients: ingredientList,
        cuisine_type: cuisineType,
        difficulty_level: difficulty,
        dietary_preferences: dietaryPrefs,
        servings: servings ? parseInt(servings) : null,
        cook_time: cookTime ? parseInt(cookTime) : null,
        special_requests: specialRequests,
        avoid_ingredients: avoidIngredientList,
        season: season,
        meal_type: mealType
      });
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
    }
  };

  const handleSaveRecipe = async () => {
    if (recipe) {
      try {
        await recipeService.saveRecipe(recipe);
        alert('Recipe saved successfully');
      } catch (error) {
        console.error('Failed to save recipe:', error);
      }
    }
  };

  const handleDietaryChange = (value, checked) => {
    if (checked) {
      setDietaryPrefs([...dietaryPrefs, value]);
    } else {
      setDietaryPrefs(dietaryPrefs.filter(pref => pref !== value));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleGenerateRecipe} className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl mb-4">Generate Recipe</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients (comma-separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., flour, sugar, eggs, milk"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cuisine Type</label>
          <select
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select cuisine type</option>
            {cuisineTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Servings</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Number of servings"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Cook Time (minutes)</label>
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Maximum cooking time"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dietary Preferences</label>
          <div className="grid grid-cols-2 gap-4">
            {dietaryOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={option.value}
                  checked={dietaryPrefs.includes(option.value)}
                  onChange={(e) => handleDietaryChange(option.value, e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={option.value} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Special Requests</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Any special instructions, flavor preferences, or cooking methods..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients to Avoid (comma-separated)</label>
          <textarea
            value={avoidIngredients}
            onChange={(e) => setAvoidIngredients(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., nuts, dairy, gluten"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Season</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select season</option>
            {seasons.map(season => (
              <option key={season.value} value={season.value}>
                {season.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select meal type</option>
            {mealTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      </form>
      {recipe && (
       <div className="mt-6">
  <h3 className="text-xl mb-2">Generated Recipe</h3>

  {/* Conditionally render the recipe details only if `recipe` object exists */}
  {recipe ? (
    <>
      <p><strong>Name:</strong> {recipe.name}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

      {/* Defensive check for ingredients */}
      <p>
        <strong>Ingredients:</strong>{" "}
        {Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(', ')
          : 'N/A'}
      </p>

      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Nutrition Highlights:</strong> {recipe.nutritionHighlights}</p>

      {/* Defensive check for chefTips */}
      <p>
        <strong>Chef Tips:</strong>{" "}
        {Array.isArray(recipe.chefTips)
          ? recipe.chefTips.join(', ')
          : 'N/A'}
      </p>

      <p><strong>Variations:</strong> {recipe.variations}</p>

      {/* Display the image if available */}
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.name} className="mt-4" />
      )}

      <button onClick={handleSaveRecipe} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Save Recipe
      </button>
    </>
  ) : (
    // Optional: Show a loading message or an empty state when recipe is not yet available
    <p>Loading recipe or no recipe generated yet...</p>
  )}
</div>
      )}
    </div>
  );
};

export default RecipeForm;