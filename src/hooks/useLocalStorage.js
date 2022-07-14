import { useState } from "react";
import { parseJSON } from "utils";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    parseJSON(localStorage.getItem(key)) || initialValue
  );

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
