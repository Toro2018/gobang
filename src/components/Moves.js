import React from 'react';

class Move extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reversed: false
    };
    this.handleReverse = this.handleReverse.bind(this);
  }

  handleReverse() {
    this.setState({
      reversed: !this.state.reversed
    })
  }

  calculateLocation(squares, move, history) {
   for (let i = 0; i < squares.length ; i++ ) {
    if (squares[i] !== history[move-1][i]) {
      return `row/行: ${1+ Math.floor(i / 15)}, column/列: ${1 + (i % 15)}`
    }
   }
  }

  render() {
   const {winner, xIsNext, jumpTo, history, stepNumber} = this.props;
   const {reversed} = this.state;

   return(
     <div>
       <div>
         { winner? "Winner/获胜方: " + winner: 
           (history.length===255? 'It\'s a draw!/平局!' :
             ( "Next player/ 下一方: " + (xIsNext ? "X" : "O") ) 
           )
         }
       </div>
       <div>
        <button onClick={this.handleReverse}>Reverse the order/ 反向排序</button>
        <div style={{overflowY: 'scroll', border: '1px solid blue', height: '500px', width: '300px'}}>
           <ol className = {reversed? 'ol-reverse' : null} >
           { history.map((step, move) =>  
             (<li key={move}>
                <button onClick={() => jumpTo(move)}
                        style = {{fontWeight: move ===stepNumber? 'bold' : null}}
                >              
                  { move? 'Go to move #/ 退回到步数' + move: 'Go to game start/ 重新开始'}
                </button>
                <br/>
                <div>
                 {move? this.calculateLocation(step, move, history) : null} 
                </div>                      
              </li>)
           )}
           </ol>
        </div>    
       </div>      
     </div>
   ) 
  }  
}

export default Move;
