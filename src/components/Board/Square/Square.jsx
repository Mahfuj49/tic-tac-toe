import React from "react";

function Square({ onClick, value, className }) {
  if(className) {
    return (
      <button className={["square", className.winnerSquare].join(" ")} onClick={onClick}>
        {value}
      </button>
    );
  }

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;