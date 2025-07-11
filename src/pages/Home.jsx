import IngredientInput from '../components/IngredientInput';
import DietaryFilter from '../components/DietaryFilter';

function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Generate Your Recipe!</h1>
      <div className="max-w-2xl mx-auto">
        <IngredientInput />
        <DietaryFilter />
      </div>
    </div>
  );
}

export default Home;