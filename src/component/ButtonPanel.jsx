// src/components/ButtonPanel.js
import React from 'react';
import Button from './Button';

const ButtonPanel = ({ onClick, handleEvaluate, handleClear, handleBackspace }) => {
  return (
    <div className="buttons">
      <Button onClick={handleClear} label="Ｃ" className="clear" />
      <Button onClick={() => onClick("%")} label="%" className="operator" />
      <Button onClick={handleBackspace} label="←" />
      <Button onClick={handleEvaluate} label="=" />

      <Button onClick={() => onClick("*")} label="*" className="operator" />
      <Button onClick={() => onClick("7")} label="7" />
      <Button onClick={() => onClick("8")} label="8" />
      <Button onClick={() => onClick("9")} label="9" />
      <Button onClick={() => onClick("/")} label="/" className="operator" />

      <Button onClick={() => onClick("4")} label="4" />
      <Button onClick={() => onClick("5")} label="5" />
      <Button onClick={() => onClick("6")} label="6" />
      <Button onClick={() => onClick("+")} label="+" className="operator" />

      <Button onClick={() => onClick("1")} label="1" />
      <Button onClick={() => onClick("2")} label="2" />
      <Button onClick={() => onClick("3")} label="3" />
      <Button onClick={() => onClick("-")} label="-" className="operator" />

      <Button onClick={() => onClick("0")} label="0" className="zero" />
      <Button onClick={() => onClick(".")} label="." />
      <Button onClick={() => onClick("00")} label="00" />
    </div>
  );
};

export default ButtonPanel;
