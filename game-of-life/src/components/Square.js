import React from "react";
import { doc } from "prettier";

const handleClick = (e) => {
  if (e.target.style.backgroundColor === "yellow") {
    e.target.style.backgroundColor = "white";
    return;
  }
  e.target.style.backgroundColor = "yellow";
};

const handleHover = (e) => {
  if (mouseDown) {
    if (e.target.style.backgroundColor === "yellow") {
      e.target.style.backgroundColor = "white";
    } else {
      e.target.style.backgroundColor = "yellow";
    }
  }
};

var mouseDown = 0;
document.body.onmousedown = () => {
  ++mouseDown;
};
document.body.onmouseup = () => {
  --mouseDown;
};

const Square = (props) => {
  const { sideLength } = props;
  return (
    <div
      className={"square"}
      style={{
        width: `${sideLength}px`,
        height: `${sideLength}px`,
      }}
      onClick={handleClick}
      onMouseEnter={handleHover}
    />
  );
};

export default Square;
