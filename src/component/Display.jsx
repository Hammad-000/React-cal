
import React from 'react';
import './Display.css';

const Display = ({ value }) => {
  return (
    <div className="display">
      <input type="text" value={value} readOnly />
    </div>
  );
};

export default Display;
