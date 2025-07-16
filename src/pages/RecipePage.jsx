import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

function RecipePage() {
  const { state } = useLocation();
  const recipe = state?.recipe;

  if (!recipe) {
    return <div className="container mx-auto p-6">No recipe found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Your Recipe</h1>
      <RecipeCard recipe={recipe} />
    </div>
  );
}

export default RecipePage;