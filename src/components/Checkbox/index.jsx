import React from "react";
import "./styles.css";

const Checkbox = ({ value, onChange }) => {
  return (
    <label className="checkbox-container">
      Are you scrum master?
      <input type="checkbox" checked={value} onChange={onChange} name="scrum" />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
