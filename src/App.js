import React, { Component } from 'react';
import Board from './components/Board';
import Moves from './components/Moves';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [Array(255).fill(null)],
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
    const Xfilled = squares.map( (step, i) => step === 'X'? i: 'empty').filter( i => i !== 'empty');
    const Ofilled = squares.map( (step, i) => step === 'O'? i: 'empty').filter( i => i !== 'empty');
 
      let Xwin = this.calculateLocation( Xfilled );      
      if (Xwin) {
        return { name: 'X', position: Xwin }; 
      }

      let Owin = this.calculateLocation( Ofilled );      
      if (Owin) {
        return { name: 'O', position: Owin }; 
      }
    }    

   calculateLocation(array) {
      for (let i = 0; i < array.length - 4; i++) {
        let location = this.winningArray(array[i]);
        while (location.length) {
          let unit = location.splice(0, 5);
          let checkLocation = unit.every( num => array.includes(num) );
          if(checkLocation) {
            return unit;
          }
        }        
      }
      return false;     
    }    

  winningArray(location) {
      let arr = [];     

      if(location%15 <= 10) {
        for (let i = 0; i < 5; i++) {
          arr.push(location + i);
        }     
      }

      if(location <= 165) {
         for (let i = 0; i < 5; i++) {
          arr.push(location + i * 15);       
        }        
      }

      if(location%15 <= 10 && location <= 165) {
        for (let i = 0; i < 5; i++) {
          arr.push(location + i * 15 + i);       
        }
      }

      if(location%15 >= 4 && location <= 165) {
        for (let i = 0; i < 5; i++) {
          arr.push(location + i * 15 - i);       
        }
      }

      return  arr;
    }

    render() {
      const { history, stepNumber, xIsNext } = this.state;   
      const squares = history[stepNumber];
      const winner = this.calculateWinner(squares);  

      return (
        <div className="game">        
      <h1>Gobang</h1>     
                     
      <img src='https://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/17/f9/e8/17f9e842-f128-b7cf-2ca5-86fcd977218e/source/1200x630bb.jpg'
             alt='Gobang'             
      />      
        <div className="main-field">
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
      </div>
      );
    }
}

export default App;
