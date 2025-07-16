// src/components/Layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">Recipe Generator</Link>
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.email}</span>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;