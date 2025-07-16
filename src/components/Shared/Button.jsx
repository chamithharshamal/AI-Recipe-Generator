// src/components/Shared/Button.jsx
import React from 'react';

const Button = ({ type = 'button', onClick, children, className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded ${className} ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;