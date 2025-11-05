// src/components/Calculator.js
import React, { useState, useEffect } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    const operators = ['+', '-', '*', '/', '%'];
  
    // Prevent consecutive operators (including %)
    if (operators.includes(value) && operators.includes(input[input.length - 1])) {
      return;
    }
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEvaluate = () => {
    if (input.trim() === "") {
      setInput("Error");
      return;
    }

    try {
      const percentageRegex = /(\d+)(%)$/g;
      let modifiedInput = input.replace(percentageRegex, (match, number) => {
        return `+${(parseFloat(number) / 100) * parseFloat(number)}`;
      });

      const validInputRegex = /^[0-9+\-*/.()%]+$/;  
      if (!validInputRegex.test(modifiedInput)) {
        throw new Error("Invalid characters in expression");
      }

      const result = Function('return ' + modifiedInput)(); 

      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid result");
      }

      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleKeyPress = (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      handleClick(key);
    } else if (key === '.') {
      handleClick('.');
    } else if (key === '+') {
      handleClick('+');
    } else if (key === '-') {
      handleClick('-');
    } else if (key === '*') {
      handleClick('*');
    } else if (key === '/') {
      handleClick('/');
    } else if (key === '%') {
      handleClick('%');
    } else if (key === 'Enter') {
      handleEvaluate();
    } else if (key === 'Backspace' || key === 'ArrowLeft') {
      handleBackspace();
    } else if (key === 'Escape') {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, );

  return (
    <div className="calculator">
      <Display value={input} />
      <ButtonPanel
        onClick={handleClick}
        handleEvaluate={handleEvaluate}
        handleClear={handleClear}
        handleBackspace={handleBackspace}
      />
    </div>
  );
};

export default Calculator;
