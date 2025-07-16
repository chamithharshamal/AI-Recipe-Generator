const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generateRecipe = async (ingredients) => {
  try {
    const response = await axios.post('https://api.gemini.com/v1/generate-recipe', {
      ingredients,
      apiKey: process.env.GEMINI_API_KEY,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to generate recipe from Gemini API');
  }
};

module.exports = {
  generateRecipe,
};