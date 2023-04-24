import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(destination, status) {
    if (status !== true) {
      setHistory(prev => [...prev, destination]);
    }
    setMode(destination);
      return mode;

  }

  function back() {
    if (mode !== initial) {
      history.pop();
      const element = history[history.length - 1];
      return setMode(element);
    }
  }

  return { mode, transition, back };
}
