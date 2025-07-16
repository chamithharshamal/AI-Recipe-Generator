const Recipe = require('../models/Recipe');

const getSavedRecipes = async (userId) => {
  const recipes = await Recipe.find({ user: userId });
  return recipes;
};

const saveRecipe = async (recipeData, userId) => {
  const { name, ingredients, instructions } = recipeData;
  const recipe = await Recipe.create({ name, ingredients, instructions, user: userId });
  return recipe;
};

module.exports = {
  getSavedRecipes,
  saveRecipe,
};