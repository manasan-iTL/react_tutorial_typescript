import {ISquare} from '../interface'

// propsの定義　今回はGame、Boardがそれぞれsquares、onClickを渡している。
interface SquareProps {
    value: ISquare,
    onClick: () => void
  }
  
  function Square(props: SquareProps) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square