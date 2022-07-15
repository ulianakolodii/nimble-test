import React, { useState } from "react";
import classes from "./styles.module.css";

const Input = ({ children, initialValue = "", onAdd }) => {
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd(value);
      setValue("");
    }
  };

  const handleInput = (event) => {
    setValue(event.target.value);
    setValue("");
  };

  const handleChildrenClick = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div className={classes.inputWrapper} onKeyDown={handleKeyDown}>
      <input
        className={classes.inputField}
        value={value}
        onInput={handleInput}
        placeholder="Enter tracker name"
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
