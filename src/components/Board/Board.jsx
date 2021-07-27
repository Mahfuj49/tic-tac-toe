import React from "react";
import Classes from "./Board.module.css";
import Square from "./Square/Square";

function Board({ onClick, squares, winMoves }) {
  

  // functionality for render a Square


  function renderSquare(i) {

    // if someone wins then highlight those winning moves
    if (winMoves) {
      const [a, b, c] = winMoves;

      if(i === a || i === b || i === c) {
        return (
          <Square
            key={`${i}${Math.random()}`} // `${i}${Math.random()}` this is used for giving a unique key to every item in React list
            value={squares[i]}
            onClick={() => onClick(i)}
            className={Classes}
          />
        );
      }
    }
    
    // passing the state of each squares which are saved in the Board's main state
    return (
      <Square
        key={`${i}${Math.random()}`} // `${i}${Math.random()}` this is used for giving a unique key to every item in React list
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }


  // functionality to render Squares in 3 * 3 tic-tac-toe game


  let rowMaker = 0; // rowMaker is the index of every Squares in the Board
  let boardRows = [];

  for (let j = 1; j <= 3; j++) {
    let rowSquares = []; // all the Squares in every Board row
    let boundary = 0; // it is the boundary number when we reached the boundary number to 3 we have to fill the Squares in the next Board row

    for (rowMaker; rowMaker < 9; rowMaker++) {
      rowSquares = [...rowSquares, renderSquare(rowMaker)];
      boundary++;

      if (boundary === 3) break;
    }

    rowMaker++;
    boardRows = [
      ...boardRows,
      <div key={`${j}${Math.random()}`} className="board-row">
        {rowSquares}
      </div>,
    ];
  }

  return (
    <div>
      {boardRows}
    </div>
  );
}

export default Board;
