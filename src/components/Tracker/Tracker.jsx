import React from "react";

const Tracker = ({ name, spent, paused, onStart, onPause, onRemove }) => {
  const handleStart = () => {
    onStart(name);
  };

  const handlePause = () => {
    onPause(name);
  };

  const handleRemove = () => {
    onRemove(name);
  };


  return (
    <div>
      <div>
        <span>{name}</span>
      </div>
      <div>
        <span>{spent}</span>
        {paused && <button onClick={handleStart}>Start</button>}
        {!paused && <button onClick={handlePause}>Pause</button>}
        <button onClick={handleRemove}>Delete</button>
      </div>
    </div>
  );
};

export default Tracker;
