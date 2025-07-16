import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

const generateRecipe = async (ingredientsData) => {
  // Remove authorization for testing
  const response = await axios.post(`${API_URL}/generate`, ingredientsData);
  return response.data;
};

const getSavedRecipes = async () => {
  const response = await axios.get(`${API_URL}/saved`);
  return response.data;
};

const saveRecipe = async (recipeData) => {
  const response = await axios.post(`${API_URL}/save`, recipeData);
  return response.data;
};

const recipeService = {
  generateRecipe,
  getSavedRecipes,
  saveRecipe,
};

export default recipeService;