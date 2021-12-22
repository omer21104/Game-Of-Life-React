import React from "react";
import { useState, useEffect } from "react";

const Square = (props) => {
  const { index, sideLength, isAlive, callback } = props;
  const styleClassNames = { alive: "square-alive", dead: "square-dead" };
  const [alive, setAlive] = useState(isAlive);
  const [style, setStyle] = useState(styleClassNames.dead);
  const onCellChange = callback;

  useEffect(() => {
    changeStyle(isAlive);
  });

  useEffect(() => {
    changeStyle();
  }, [alive]);

  const handleClick = (e) => {
    setAlive((prevState) => {
      let newState = !prevState;
      return newState;
    });
    onCellChange(index);
  };

  const changeStyle = (cond) => {
    if (cond) {
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
