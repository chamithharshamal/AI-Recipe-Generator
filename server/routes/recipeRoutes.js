const express = require('express');
const { generateRecipe, getSavedRecipes, saveRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Remove protect middleware and testEndpoint for now
router.post('/generate', generateRecipe);
router.get('/saved', getSavedRecipes);
router.post('/save', saveRecipe);

module.exports = router;