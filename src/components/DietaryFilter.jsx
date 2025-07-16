import { useState } from 'react';

function DietaryFilter() {
  const [diet, setDiet] = useState('');

  const handleChange = (e) => {
    setDiet(e.target.value);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Dietary Preferences</h2>
      <select
        value={diet}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">None</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="keto">Keto</option>
      </select>
    </div>
  );
}

export default DietaryFilter;