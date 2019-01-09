import React from 'react';
import Board from './Board';
import Moves from './Moves';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      stepNumber: 0,
      xIsNext: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i) {
    const {history, stepNumber, xIsNext} = this.state;
    const trimedHistory = history.slice(0, stepNumber + 1);
    const squares = trimedHistory[stepNumber].slice();

    if (squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    
    this.setState({
      history: trimedHistory.concat([squares]),
      stepNumber: stepNumber+1,
      xIsNext: !xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ( squares[a] && squares[a] === squares[b] && squares[b]=== squares[c] ) {
        return { name: squares[a], position: lines[i] }; 
      }
    }
    return null;
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;   
    const squares = history[stepNumber];
    const winner = this.calculateWinner(squares);  

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={ i => winner? null: this.handleClick(i) }
            winnerPostion= {winner? winner.position : null}
          />
        </div>
        <div className="game-info">
         <Moves 
            history={history} 
            xIsNext={xIsNext}
            winner={winner? winner.name: null}
            jumpTo={ (step) => this.jumpTo(step) }
            stepNumber = {stepNumber}
          />
        </div>
      </div>
    );
  }
}

export default Game;


