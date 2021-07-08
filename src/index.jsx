import React from "react";
import ReactDOM from "react-dom";
import "../src/index.css";



// ========================================


// class based Square component
// class Square extends React.Component {

//   render() {
//     return (
//       <button className="square" onClick={this.props.onClick}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// function based Square component
const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};



// ========================================



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    // copying the state's squares array to manipulate the array without disturbing the main state
    const squares = [...this.state.squares]; 

    // changing that index's value for clicking event on square the index number lies
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // merging the updated value to the state
    this.setState(
      {
        squares: squares,
        
        // flipping the xIsNext whenever a Square is clicked
        xIsNext: !this.state.xIsNext,
      }
    );
  }

  renderSquare(i) {
    // passing the state of each squares which are saved in the Board's main state
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



// ========================================



class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



// ========================================



ReactDOM.render(<Game />, document.getElementById("root"));
