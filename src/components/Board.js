import React from 'react';
import Square from './Square';

function Board ({squares, onClick, winnerPostion}) { 
    let emptyArr = Array(15).fill(null);
    return (
      <div>
         {  
          emptyArr.map( (item, rowIndex) => 
            ( <div key = {rowIndex} className="board-row">
               {
                emptyArr.map( (item, colIndex) => 
                (<Square 
                  key={15*rowIndex + colIndex}
                  value={squares[15*rowIndex + colIndex]}
                  onClick={() => onClick(15*rowIndex + colIndex)}
                  highlight={ winnerPostion? winnerPostion.includes(15*rowIndex + colIndex) : null }
                 />) 
                )
              }
            </div> )
          )
        }
      </div>
    )
}

export default Board;