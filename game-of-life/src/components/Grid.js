import React from "react";
import Square from "./Square";
import { useState, useEffect } from "react";

const Grid = (props) => {
  const { rows, cols, cellSideLength } = props;
  let idNum = 0;

  const initMatrix = () => {
    let tempMatrix = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        tempMatrix.push({ index: idNum, alive: false });
        idNum += 1;
      }
    }
    return tempMatrix;
  };
  const [matrix, setMatrix] = useState(initMatrix());

  const onCellLifeChange = (cellIndex) => {
    setMatrix((prevState) => {
      let newMatrix = Array.from(prevState);
      newMatrix[cellIndex].alive = !newMatrix[cellIndex].alive;
      return newMatrix;
    });
  };

  const clearCells = () => {
    setMatrix((prevState) => {
      let newMatrix = [];
      for (let i = 0; i < prevState.length; i++) {
        let { index, alive } = prevState[i];
        newMatrix.push({
          index: index,
          alive: false,
        });
      }
      return newMatrix;
    });
  };
  return (
    <>
      <div className={"grid"} style={{ width: cellSideLength * cols }}>
        {matrix.map((cell) => {
          const { alive, index } = cell;
          return (
            <Square
              index={index}
              sideLength={cellSideLength}
              isAlive={alive}
              callback={onCellLifeChange}
            />
          );
        })}
      </div>
      <button>start</button>
      <button onClick={clearCells}>clear</button>
    </>
  );
};

export default Grid;
