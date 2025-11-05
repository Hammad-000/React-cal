// src/components/Button.js
import React from 'react';
import './Button.css';

const Button = ({ onClick, label, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
