import React, { useState } from "react";
import classes from "./styles.module.css";

const Input = ({ children, initialValue = "", onAdd, onInput }) => {
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd(value);
    }
  };

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  const handleChildrenClick = () => {
    onAdd(value);
  };

  return (
    <div className={classes.inputWrapper} onKeyDown={handleKeyDown}>
      <input
        className={classes.inputField}
        value={value}
        onInput={handleInput}
      />
      {children && (
        <div className={classes.children} onClick={handleChildrenClick}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
