import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function IngredientInput() {
  const [ingredients, setIngredients] = useState(['']);
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/recipes/generate', {
        ingredients: ingredients.filter((ing) => ing.trim() !== ''),
      });
      navigate('/recipes', { state: { recipe: response.data } });
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Enter Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          value={ingredient}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Ingredient ${index + 1}`}
          className="w-full p-2 mb-2 border rounded"
        />
      ))}
      <button
        type="button"
        onClick={handleAddIngredient}
        className="bg-blue-500 text-white p-2 rounded mr-2"
      >
        Add Ingredient
      </button>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Generate Recipe
      </button>
    </form>
  );
}

export default IngredientInput;