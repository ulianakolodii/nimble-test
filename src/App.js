import React, { useMemo, useState, useEffect } from "react";
import "assets/styles/App.css";
import Input from "./components/Input/Input";
import PlayButton from "./components/PlayButton/PlayButton";
import Tracker from "./components/Tracker/Tracker";
import { useLocalStorage } from "hooks";

const toHumanTime = (time) => new Date(time).toISOString().slice(11, 19);

const isPaused = (transactions) =>
  transactions[transactions.length - 1][1] !== undefined;

const calculateTimeDifferences = (transactions) =>
  transactions.reduce(
    (acc, [start, end]) => acc + ((end || Date.now()) - start),
    0
  );

const prepareTrackersList = (state) =>
  Object.keys(state).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        spent: toHumanTime(calculateTimeDifferences(state[key])),
        paused: isPaused(state[key]),
      },
    }),
    {}
  );

const pause = (transactions) => {
  const [start] = transactions.pop();
  return [...transactions, [start, Date.now()]];
};

const start = (transactions) => {
  return [...transactions, [Date.now()]];
};

const remove = (state, keyToRemove) =>
  Object.keys(state).reduce((newState, key) => {
    if (key !== keyToRemove) {
      return {
        ...newState,
        [key]: state[key],
      };
    }
    return newState;
  }, {});

const App = ({ interval = 1000 }) => {
  const [state, setState] = useLocalStorage("tracker", {});
  const [tick, setTick] = useState(0);

  const preparedState = useMemo(
    () => prepareTrackersList(state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, tick]
  );

  const handleAdd = (value) => {
    const name =
      value || new Date().toISOString().slice(0, 19).replace("T", " ");
    setState({
      ...state,
      [name]: [[Date.now()]],
    });
  };

  const handlePause = (name) => {
    setState({
      ...state,
      [name]: pause(state[name]),
    });
  };

  const handleStart = (name) => {
    setState({
      ...state,
      [name]: start(state[name]),
    });
  };

  const handleRemove = (name) => {
    setState(remove(state, name));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <div className="App">
      <div className="tracker__title">Time tracker</div>
      <Input onAdd={handleAdd}>
        <PlayButton />
      </Input>
      {Object.keys(preparedState).map((name) => (
        <Tracker
          key={name}
          name={name}
          spent={preparedState[name].spent}
          paused={preparedState[name].paused}
          onPause={handlePause}
          onStart={handleStart}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default App;
