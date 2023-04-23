import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(destination, status) {
    if (status !== true) {
      setHistory(prev => [...prev, destination]);
    }
      return setMode(destination); 

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
