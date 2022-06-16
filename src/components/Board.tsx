import React from 'react';
import {ISquare} from '../interface'
import Square from './Square'

interface BoardProps {
    squares: ISquare[],
    onClick: (i : number) => void
  }
  
// React.FC/VFC 関数コンポーネント用のジェネリクス。  
const Board:React.FC<BoardProps> = (props) => {
    // 引数をnumber型にする
    const renderSquare = (i : number) => {
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      );
    }
    return (
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
    );
    }

  export default Board