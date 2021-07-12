import React, { Component } from "react";
import Board from "../../components/Board/Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // copying the state's squares array to manipulate the array without disturbing the main state
    const squares = [...this.state.squares];

    // if someone wins, don't allow anyone to take a move farther
    if (this.calculateWinner() || squares[i]) return;
    
    // if someone doesn't win, allow anyone to take a move farther
    else {
      // changing that index's value for clicking event on square the index number lies
      squares[i] = this.state.xIsNext ? "X" : "O";

      // merging the updated value to the state
      this.setState({
        squares: squares,

        // flipping the xIsNext whenever a Square is clicked
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  calculateWinner() {
    const winMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winMoves.length; i++) {
      const [a, b, c] = winMoves[i];
      const squares = this.state.squares;

      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        // returning the winnig player and winning moves
        return {
          player: squares[a],
          winMove: [a, b, c],
        };
      }
    }

    return null;
  }

  render() {
    // if calculateWinner method returns the winning object then initialize the winner with winnig player
    const winner = this.calculateWinner() ? this.calculateWinner().player : null;

    // if calculateWinner method returns the winning object then initialize the winMoves with winnig moves


    // setting the description according to the game's situation
    const desc = winner ? ("Winner: " + winner) : ("Next player: " + (this.state.xIsNext ? "X" : "O"));

    // sending the updated game description to status
    const status = desc;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={this.state.squares}
            status={status}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
