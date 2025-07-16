import '../styles/RecipeCard.css';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
      <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Instructions</h3>
      <ol className="list-decimal pl-5">
        {recipe.instructions?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeCard;