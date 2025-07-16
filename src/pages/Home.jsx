// src/pages/Home.jsx
import React from 'react';
import RecipeForm from '../components/Recipe/RecipeForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <RecipeForm />
    </div>
  );
};

export default Home;