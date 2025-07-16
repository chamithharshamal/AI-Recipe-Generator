// src/components/Shared/Input.jsx
import React from 'react';

const Input = ({ type = 'text', name, value, onChange, placeholder, className = '', required = false }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 border rounded ${className}`}
      required={required}
    />
  );
};

export default Input;