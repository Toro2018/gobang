import React from 'react';

function Square({onClick, value, highlight}) {
  return (
    <button 
      className="square" 
      onClick={onClick}
      style={{color: highlight? 'red': null }}
      >
      {value}
    </button>
  );
}

export default Square;