import React from "react";
import Square from "./Square";

const Grid = (props) => {
  const { rows, cols, cellSideLength } = props;
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    const currentRow = [];
    for (let j = 0; j < cols; j++) {
      currentRow.push(<Square sideLength={cellSideLength} />);
    }
    matrix.push(currentRow);
  }
  return (
    <div className={"grid"} style={{ width: cellSideLength * cols }}>
      {matrix}
    </div>
  );
};

export default Grid;
