import React from 'react';
import { useState } from 'react';
import {ISquare, History} from '../interface'
import Board from './Board'
  
export const Game: React.FC = () => {

    const [history, setHistory] = useState<History[]>([{squares: Array(9).fill(null)}])
    const [stepNumber, setStepNumber] = useState<number>(0)
    const [xIsNext, setXIsNext] = useState<boolean>(true)
  
    // 引数を数字に変更
    const handleClick = (i: number) => {
      const _history = history.slice(0, stepNumber + 1);
      const current = _history[_history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';
      setHistory(_history.concat([{squares: squares}]))
      setStepNumber(_history.length)
      setXIsNext(!xIsNext)
    }
    // 引数を数字に変更
    const jumpTo = (step: number) => {
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
    }
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      // 文字列型
      let status : string;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              // 引数を数字に変更
              onClick={(i: number) => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
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

