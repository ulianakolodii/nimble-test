import React from "react";
import { ReactComponent as PlayArrow } from "assets/img/play-arrow.svg";
import classes from "./styles.module.css";

const PlayButton = () => {
  return (
    <button className={classes.playButton}>
      <PlayArrow />
    </button>
  );
};

export default PlayButton;
