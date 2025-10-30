import React, { useState, useEffect } from 'react';
import './Calculator.css';  // Ensure the CSS file is in place

const Calculator = () => {
  const [input, setInput] = useState("");

  // Function to handle button clicks
  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Function to clear the input
  const handleClear = () => {
    setInput("");
  };

  // Function to evaluate the expression
const handleEvaluate = () => {
  if (input.trim() === "") {
    setInput("Error");
    return;
  }

  try {
    // Validate the input with regex to ensure only valid characters are used
    const validInputRegex = /^[0-9+\-*/.()]+$/;
    if (!validInputRegex.test(input)) {
      throw new Error("Invalid characters in expression");
    }

    // Evaluate the expression, but use a safer method (instead of eval)
    const result = Function('return ' + input)(); // Safer alternative to eval

    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid result");
    }

    setInput(result.toString());
  } catch {
    setInput("Error");
  }
};


  // Keyboard input handling
  const handleKeyPress = (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      handleClick(key); // Handle numbers
    } else if (key === '.') {
      handleClick('.'); // Handle decimal
    } else if (key === '+') {
      handleClick('+'); // Handle addition
    } else if (key === '-') {
      handleClick('-'); // Handle subtraction
    } else if (key === '*') {
      handleClick('*'); // Handle multiplication
    } else if (key === '/') {
      handleClick('/'); // Handle division
    } else if (key === 'Enter') {
      handleEvaluate(); // Handle evaluate (equals)
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1)); // Handle backspace
    } else if (key === 'Escape') {
      handleClear(); // Handle clear (C)
    }
  };

  // Adding event listener for keyboard input when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, );

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>
      <div className="buttons">

        <button onClick={handleClear} className="clear">Ｃ</button>
        <button onClick={() => handleClick("*")} className="operator">*</button>
        <button onClick={() => handleClick("/")} className="operator">/</button>
        <button onClick={handleEvaluate}>=</button>
        
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("+")} className="operator">+</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>

        <button onClick={() => handleClick("-")} className="operator">-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        
        <button onClick={() => handleClick("0")} className="zero">0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={() => handleClick("00")}>00</button>

      </div>
    </div>
  );
};

export default Calculator;
