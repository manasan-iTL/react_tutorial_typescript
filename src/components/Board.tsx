import React from 'react';
import {ISquare} from '../interface'
import Square from './Square'

interface BoardProps {
    squares: ISquare[],
    onClick: (i : number) => void
  }
  
  class Board extends React.Component<BoardProps> {
    // 引数をnumber型にする
    renderSquare(i : number) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    render() {
      return (
        <div>
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

  export default Board