import React from "react";
import { useState, useEffect } from "react";

const Square = (props) => {
  const { i, j, sideLength, isAlive, callback } = props;
  const styleClassNames = { alive: "square-alive", dead: "square-dead" };
  const [style, setStyle] = useState(styleClassNames.dead);
  const onCellChange = callback;

  useEffect(() => {
    changeStyle(isAlive);
  });

  const handleClick = () => {
    onCellChange(i, j);
  };

  const changeStyle = () => {
    if (isAlive) {
      setStyle(styleClassNames.alive);
    } else {
      setStyle(styleClassNames.dead);
    }
  };

  return (
    <div
      className={style}
      style={{ height: `${sideLength}px`, width: `${sideLength}px` }}
      onClick={handleClick}
    />
  );
};

export default Square;
