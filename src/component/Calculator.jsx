import React, { useState, useEffect } from 'react';
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
      setInput((prevInput) => prevInput.slice(0, -1));
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
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">Ｃ</button>
        <button onClick={() => handleClick("%")} className="operator">%</button>
        <button onClick={() => setInput((prevInput) => prevInput.slice(0, -1))}>←</button>
        <button onClick={handleEvaluate}>=</button>

        <button onClick={() => handleClick("*")} className="operator">*</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")} className="operator">/</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")} className="operator">+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")} className="operator">-</button>

        <button onClick={() => handleClick("0")} className="zero">0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={() => handleClick("00")}>00</button>
      </div>
    </div>
  );
};

export default Calculator;
