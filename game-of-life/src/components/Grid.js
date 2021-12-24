import React from "react";
import Square from "./Square";
import { useState, useEffect } from "react";

const Grid = (props) => {
  const { rows, cols, cellSideLength } = props;
  const [intervalID, setIntervalID] = useState();

  const timeSlice = 800;
  let tickID;

  const initMatrix = () => {
    let tempMatrix = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ i: i, j: j, alive: false });
      }
      tempMatrix.push(row);
    }
    return tempMatrix;
  };
  const [matrix, setMatrix] = useState(initMatrix());

  // useEffect(() => {
  //   console.log("hi");
  // }, [intervalID]);

  const onCellLifeChange = (i, j) => {
    setMatrix((prevState) => {
      let newMatrix = Array.from(matrix);
      newMatrix[i][j].alive = !newMatrix[i][j].alive;

      return newMatrix;
    });
  };

  const clearCells = () => {
    clearInterval(intervalID);
    setMatrix(() => {
      return initMatrix();
    });
  };

  const countLiveNeighbors = (rowIndex, colIndex, prevState) => {
    let currentCellLiveNeighbors = 0;

    for (let i = rowIndex - 1; i < rowIndex - 1 + 3; i++) {
      for (let j = colIndex - 1; j < colIndex - 1 + 3; j++) {
        if (i === rowIndex && j === colIndex) {
          continue;
        }
        try {
          if (prevState[i][j].alive) {
            currentCellLiveNeighbors++;
          }
        } catch (e) {}
      }
    }

    return currentCellLiveNeighbors;
  };

  const startInterval = () => {
    setIntervalID(setInterval(() => tick(), timeSlice));
  };

  const pauseGame = () => {
    clearInterval(intervalID);
  };

  const tick = () => {
    setMatrix((prevState) => {
      let newState = Array.from(prevState);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let currentCellLiveNeighbors = countLiveNeighbors(i, j, prevState);
          let currentCell = prevState[i][j];

          if (currentCell.alive) {
            if (
              currentCellLiveNeighbors === 2 ||
              currentCellLiveNeighbors === 3
            ) {
              newState[i][j].alive = true;
            } else {
              newState[i][j].alive = false;
            }
          } else {
            if (currentCellLiveNeighbors === 3) {
              newState[i][j].alive = true;
            }
          }
        }
      }

      return newState;
    });
  };

  return (
    <>
      <div className={"grid"} style={{ width: cellSideLength * cols }}>
        {matrix.map((row) => {
          return (
            <div>
              {row.map((cell) => {
                const { i, j, alive } = cell;
                return (
                  <Square
                    i={i}
                    j={j}
                    isAlive={alive}
                    sideLength={cellSideLength}
                    callback={onCellLifeChange}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={startInterval}>start</button>
      <button onClick={pauseGame}>pause</button>
      <button onClick={clearCells}>clear</button>
    </>
  );
};

export default Grid;
