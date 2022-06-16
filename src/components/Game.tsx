import React from 'react';
import {ISquare, History} from '../interface'
import Board from './Board'

interface GameState {
    history: History[];
    stepNumber: number;
    xIsNext: boolean;
  }
  
export  class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        history: [{ squares: Array(9).fill(null) }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
  
      // 引数を数字に変更
    handleClick(i: number) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{ squares: squares }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    // 引数を数字に変更
    jumpTo(step: number) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      // 文字列型
      let status : string;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              // 引数を数字に変更
              onClick={(i: number) => this.handleClick(i)}
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
  
  // typeで新たに型を生成して型付けを行っている。
  // genericsでもできる Array<string | null>　ただTypeの方が厳格
  
  function calculateWinner(squares: ISquare[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

