import React, { Component } from "react";
import Board from "../../components/Board/Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    // copying the state's squares array to manipulate the array without disturbing the main state
    const squares = [...current.squares];

    // if someone wins, don't allow anyone to take a move farther
    if (this.calculateWinner(squares) || squares[i]) return;
    
    // if someone doesn't win, allow anyone to take a move farther
    else {
      // changing that index's value for clicking event on square the index number lies
      squares[i] = this.state.xIsNext ? "X" : "O";

      // merging the updated value to the state
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),

        // flipping the xIsNext whenever a Square is clicked
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }
  }

  calculateWinner(squares) {

    // combinations of moves for win the game
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

      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        
        // returning the winnig player and winning moves
        return {
          winner: squares[a],
          winMoves: [a, b, c],
        };
      }
    }

    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // adding time travel
    const moves = history.map((step, move) => {
      
      // if index is 0 means no step been taken so display 'Go to game start'
      const desc = move ? 'Go to move #' + move :
      'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} >{desc}</button>
        </li>
      );
    });

    // copying the state's squares array to manipulate the array without disturbing the main state
    const squares = [...current.squares];
    
    // if calculateWinner method returns the winning object then initialize the winner with winnig player
    const winner = this.calculateWinner(squares) ? this.calculateWinner(squares).winner : null;

    // if calculateWinner method returns the winning object then initialize the winMoves with winnig moves
    const winMoves = this.calculateWinner(squares) ? this.calculateWinner(squares).winMoves : null;

    // setting the description according to the game's situation
    const status = winner ? ("Winner: " + winner) : ("Next player: " + (this.state.xIsNext ? "X" : "O"));

    // sending the updated game description to status
    

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={squares}
            winMoves={winMoves}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
