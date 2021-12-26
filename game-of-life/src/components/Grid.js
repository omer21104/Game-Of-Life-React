import React from "react";
import Square from "./Square";
import { useState, useEffect } from "react";

const Grid = (props) => {
  const { rows, cols, cellSideLength } = props;
  const [intervalID, setIntervalID] = useState(0);
  const [timeSlice, setTimeSlice] = useState(500);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      clearInterval(intervalID);
      setIntervalID(setInterval(() => tick(), timeSlice));
    }
    setMatrix((prevState) => prevState);
  }, [timeSlice, running]);

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

  const onCellLifeChange = (i, j) => {
    setMatrix((prevState) => {
      let newMatrix = Array.from(prevState);
      newMatrix[i][j].alive = !newMatrix[i][j].alive;

      return newMatrix;
    });

    setMatrix((prevState) => prevState);
  };

  const clearCells = () => {
    clearInterval(intervalID);
    setMatrix(() => {
      return initMatrix();
    });

    document.getElementById("btn-start").disabled = false;
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
    setRunning(true);
    setIntervalID(setInterval(() => tick(), timeSlice));
    document.getElementById("btn-start").disabled = true;
  };

  const pauseGame = () => {
    setRunning(false);
    clearInterval(intervalID);
    document.getElementById("btn-start").disabled = false;
    setMatrix((prevState) => {
      return prevState;
    });
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

  const handleSliderChange = (e) => {
    setTimeSlice(e.target.value);
  };

  const test = () => {};

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
      <div className={"center-wrapper"}>
        <div className={"center-inner-wrapper"}>
          <button onClick={startInterval} id={"btn-start"}>
            start
          </button>
          <button onClick={pauseGame}>pause</button>
          <button onClick={clearCells}>clear</button>
          <button onClick={test}>test</button>
        </div>
        <div className={"center-inner-wrapper"}>
          <label>tick speed </label>
          <input
            onChange={handleSliderChange}
            type="range"
            min={200}
            max={1500}
            id={"range-slider"}
          />
          <span>{timeSlice} ms</span>
        </div>
      </div>
    </>
  );
};

export default Grid;
