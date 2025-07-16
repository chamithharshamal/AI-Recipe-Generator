import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AI Recipe Generator</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/recipes" className="hover:text-blue-200">Recipes</Link>
          <Link to="/about" className="hover:text-blue-200">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;