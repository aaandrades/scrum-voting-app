import React from "react";
import "./styles.css";

const Button = ({ onClick, label, disabled }) => {
  return (
    <button className="button-container" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
