import React from "react";
import "./Button.style.css";

interface ButtonProps {
  content: string;
  onClickHandler: () => void;
  isActive: boolean;
}

const Button = ({
  content = "",
  onClickHandler,
  isActive = false,
}: ButtonProps) => {
  return (
    <button
      className={`button ${isActive ? "active" : ""}`}
      onClick={onClickHandler}
    >
      {content}
    </button>
  );
};

export default Button;
