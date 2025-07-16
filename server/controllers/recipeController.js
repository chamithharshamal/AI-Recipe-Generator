const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generateRecipe = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { ingredients, cuisine_type, difficulty_level, dietary_preferences, servings, cook_time, special_requests, avoid_ingredients, season, meal_type } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
      console.log('Invalid ingredients format:', ingredients);
      return res.status(400).json({ error: 'Ingredients must be provided as an array' });
    }

    console.log('Processing ingredients:', ingredients);

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key found, using fallback');
      const fallbackRecipe = generateFallbackRecipe(ingredients);
      return res.json(fallbackRecipe);
    }

    // Enhanced prompt for better recipe generation
    let prompt = `You are a professional chef with 20 years of experience. Create an exceptional recipe using these main ingredients: ${ingredients.join(', ')}.`;

    if (cuisine_type) {
      prompt += ` The recipe should be ${cuisine_type} cuisine.`;
    }

    if (difficulty_level) {
      prompt += ` Make it ${difficulty_level} difficulty level.`;
    }

    if (dietary_preferences && dietary_preferences.length > 0) {
      prompt += ` The recipe must be ${dietary_preferences.join(', ')}.`;
    }

    if (servings) {
      prompt += ` It should serve ${servings} people.`;
    }

    if (cook_time) {
      prompt += ` Total cooking time should be around ${cook_time} minutes.`;
    }

    if (special_requests) {
      prompt += ` Additional requirements: ${special_requests}.`;
    }

    if (avoid_ingredients && avoid_ingredients.length > 0) {
      prompt += ` Avoid using these ingredients: ${avoid_ingredients.join(', ')}.`;
    }

    if (season) {
      prompt += ` The recipe should be suitable for the ${season} season.`;
    }

    if (meal_type) {
      prompt += ` The recipe should be for ${meal_type}.`;
    }

    prompt += `
    Please provide a complete recipe with:
    - A creative and appetizing title
    - A brief description
    - Complete ingredients list with amounts and units
    - Step-by-step cooking instructions
    - Preparation and cooking times
    - Any helpful tips or variations

    Make sure the recipe is practical, delicious, and well-balanced.`;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8, // Increased for more creativity
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048 // Increased for more detailed responses
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = geminiResponse.data.candidates[0].content.parts[0].text;
    console.log('Gemini raw response:', generatedText);

    // Parse the JSON response from Gemini
    let recipe;
    try {
      // Clean the response text to extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0]);

        // Ensure backward compatibility with your frontend
        if (recipe.instructions && Array.isArray(recipe.instructions)) {
          recipe.instructions = recipe.instructions.join('\n');
        }

        // Add missing fields if not present
        if (!recipe.cookingTime && recipe.prepTime) {
          recipe.cookingTime = recipe.prepTime;
        }
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.log('JSON parsing failed, creating structured response');
      // If JSON parsing fails, create a structured response from the text
      recipe = {
        name: `Gourmet ${ingredients[0]} Creation`,
        description: "A chef-inspired dish featuring fresh ingredients",
        cuisine: "Fusion",
        difficulty: "Medium",
        ingredients: ingredients.map(ing => `1 cup ${ing}`).concat([
          '2 tbsp olive oil',
          'Salt and pepper to taste',
          '1 tsp garlic powder'
        ]),
        instructions: generatedText,
        cookingTime: '35 minutes',
        prepTime: '15 minutes',
        servings: 4,
        nutritionHighlights: "Rich in nutrients and flavor",
        chefTips: ["Taste and adjust seasoning", "Let ingredients come to room temperature"],
        variations: "Customize with your favorite herbs and spices"
      };
    }

    recipe.id = Date.now();

    console.log('Generated recipe:', recipe);
    res.json(recipe);

  } catch (error) {
    console.error('Error generating recipe with Gemini:', error);

    // Fallback to enhanced mock recipe if API fails
    const fallbackRecipe = generateFallbackRecipe(req.body.ingredients);
    res.json(fallbackRecipe);
  }
};

// Enhanced fallback recipe generator
const generateFallbackRecipe = (ingredients) => {
  const recipeTypes = ['Stir-fry', 'Soup', 'Casserole', 'Salad', 'Pasta', 'Curry', 'Bowl', 'Skillet', 'Dessert', 'Stew', 'Gratin', 'Paella'];
  const cookingMethods = ['sauté', 'roast', 'steam', 'grill', 'bake', 'simmer', 'mix', 'whip', 'boil', 'fry'];
  const seasonings = ['herbs', 'spices', 'garlic', 'ginger', 'lemon juice', 'soy sauce', 'vanilla extract', 'cinnamon', 'paprika', 'thyme'];
  const dessertTypes = ['cake', 'cookie', 'pie', 'tart', 'pudding', 'mousse'];

  const randomType = recipeTypes[Math.floor(Math.random() * recipeTypes.length)];
  const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
  const randomSeasoning = seasonings[Math.floor(Math.random() * seasonings.length)];
  const randomDessertType = dessertTypes[Math.floor(Math.random() * dessertTypes.length)];

  const baseIngredients = [
    '2 tbsp olive oil',
    'Salt and pepper to taste',
    '1 tsp garlic powder',
    '1 onion, diced'
  ];

  const mainIngredients = ingredients.map(ing => {
    const measurements = ['1 cup', '2 cups', '1 lb', '1/2 lb', '3-4 pieces'];
    const randomMeasurement = measurements[Math.floor(Math.random() * measurements.length)];
    return `${randomMeasurement} ${ing}`;
  });

  if (ingredients.includes('chocolate') || ingredients.includes('sugar') || ingredients.includes('flour')) {
    return {
      name: `${randomDessertType} with ${ingredients.slice(0, 2).join(' and ')}`,
      ingredients: [...mainIngredients, ...baseIngredients],
      instructions: `1. Preheat your oven to 350°F (175°C).\n2. Mix ${ingredients.join(', ')} and ${randomSeasoning} in a bowl.\n3. Pour the mixture into a greased baking dish.\n4. Bake for 25-30 minutes until golden brown.\n5. Let it cool before serving.\n6. Enjoy your homemade ${randomDessertType}!`,
      cookingTime: `${25 + Math.floor(Math.random() * 10)} minutes`,
      servings: Math.floor(Math.random() * 4) + 2,
      id: Date.now()
    };
  } else {
    const specificInstructions = {
      'Pasta': `1. Cook pasta according to package instructions until al dente.\n2. In a separate pan, heat olive oil and sauté ${ingredients.join(', ')} until tender.\n3. Combine pasta and sautéed ingredients, adding ${randomSeasoning} and adjusting seasoning to taste.\n4. Serve hot and garnish with fresh herbs.`,
      'Stir-fry': `1. Heat olive oil in a wok or large skillet over high heat.\n2. Add ${ingredients.join(', ')} and stir-fry for 5-7 minutes until tender.\n3. Season with ${randomSeasoning} and adjust seasoning to taste.\n4. Serve hot over rice or noodles.`,
      'Stew': `1. In a large pot, heat olive oil and sauté ${ingredients.join(', ')} until tender.\n2. Add enough liquid (e.g., broth, water) to cover the ingredients and simmer for 20-25 minutes.\n3. Season with ${randomSeasoning} and adjust seasoning to taste.\n4. Serve hot with crusty bread.`,
      'Gratin': `1. Preheat your oven to 375°F (190°C).\n2. Layer ${ingredients.join(', ')} in a baking dish, seasoning each layer with ${randomSeasoning}.\n3. Top with grated cheese and bake for 20-25 minutes until bubbly and golden.\n4. Serve hot and enjoy!`,
      'Paella': `1. In a large paella pan, heat olive oil and sauté ${ingredients.join(', ')} until tender.\n2. Add rice and enough broth to cover, simmering for 20-25 minutes until the rice is cooked.\n3. Season with ${randomSeasoning} and adjust seasoning to taste.\n4. Garnish with fresh herbs and serve hot.`
    };

    return {
      name: `${randomType} with ${ingredients.slice(0, 2).join(' and ')}`,
      ingredients: [...mainIngredients, ...baseIngredients],
      instructions: specificInstructions[randomType] || `1. Heat olive oil in a large pan over medium heat.\n2. Add diced onion and cook until translucent (3-4 minutes).\n3. Add ${ingredients.join(', ')} and ${randomMethod} for 5-7 minutes.\n4. Season with salt, pepper, garlic powder, and ${randomSeasoning}.\n5. Continue cooking for 15-20 minutes until everything is tender and well combined.\n6. Taste and adjust seasonings as needed.\n7. Serve hot and enjoy your homemade ${randomType}!`,
      cookingTime: `${20 + Math.floor(Math.random() * 25)} minutes`,
      servings: Math.floor(Math.random() * 4) + 2,
      id: Date.now()
    };
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    console.log('Getting saved recipes...');
    // Return empty array for now - you can implement database logic here
    res.json([]);
  } catch (error) {
    console.error('Error getting saved recipes:', error);
    res.status(500).json({ error: 'Failed to get saved recipes' });
  }
};

const saveRecipe = async (req, res) => {
  try {
    console.log('Saving recipe:', req.body);
    const recipeData = req.body;
    // For now, just return success - you can implement database logic here
    res.json({ message: 'Recipe saved successfully', recipe: recipeData });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
};

module.exports = {
  generateRecipe,
  getSavedRecipes,
  saveRecipe,
};