import React, { useState, useEffect } from "react";
import { SignItem } from "./components/SignItem/SignItem";
import { Win, Status, getRandomSignType } from "./utils/common";
import "./App.css";
import "./utils/grid.css";

const initialStatus = Status.going;

const initialSign: Sign = {
  type: null,
  isPlayer: true,
};

const initialBotSign: Sign = {
  type: null,
  isPlayer: false,
};

let timeout: number;

function App() {
  const [status, setStatus] = useState(initialStatus);
  const [sign, setSign] = useState(initialSign);
  const [botSign, setBotSign] = useState(initialBotSign);

  const guess = (selectedSign: Sign, _botSign: Sign): boolean => {
    if (selectedSign.type === null) {
      throw new Error("Selected sign is null");
    }

    return Win.get(selectedSign.type) === _botSign.type;
  };

  useEffect(() => {
    if (sign.type === botSign.type) {
      setStatus(Status.draw);
    } else if (guess(sign, botSign)) {
      setStatus(Status.win);
    } else {
      setStatus(Status.loss);
    }

    timeout = window.setTimeout(() => {
      setStatus(Status.going);
    }, 3000);
  }, [sign, botSign]);

  const toggle = (selectedSign: Sign): void => {
    if (timeout) clearTimeout(timeout);

    const bs = { type: getRandomSignType() || null, isPlayer: false };
    setBotSign(bs);
    setSign(selectedSign);
  };

  return (
    <div className="App">
      <div className="container main">
        <SignItem sign={sign} action={toggle} status={status} />
        <SignItem sign={botSign} status={status} />
      </div>
    </div>
  );
}

export default App;
