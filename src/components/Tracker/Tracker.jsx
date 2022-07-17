import React from "react";
import classes from "./styles.module.css";
import { ReactComponent as PauseIcon } from "assets/img/pause-icon.svg";
import { ReactComponent as StartIcon } from "assets/img/play-icon.svg";
import { ReactComponent as RemoveIcon } from "assets/img/remove-icon.svg";
import { joinClasses } from "utils";

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
    <div
      className={joinClasses(
        classes.trackerContainer,
        !paused && classes.active
      )}
    >
      <div>
        <span className={classes.trackerTitle}>{name}</span>
      </div>
      <div className={classes.trackerSubContainer}>
        <span className={classes.spentTime}>{spent}</span>
        <div className={classes.buttonsContainer}>
          {paused && (
            <button className={classes.startButton} onClick={handleStart}>
              <StartIcon />
            </button>
          )}
          {!paused && (
            <button className={classes.pauseButton} onClick={handlePause}>
              <PauseIcon />
            </button>
          )}
          <button className={classes.removeButton} onClick={handleRemove}>
            <RemoveIcon className={classes.removeIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
