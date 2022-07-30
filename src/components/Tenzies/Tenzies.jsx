import Dice from "./Dice";
import Confetti from "react-confetti";
import { useState, Fragment, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Tenzies = () => {
  const initDices = () => {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push({
        value: Math.floor(Math.random() * 6) + 1,
        frozen: false,
        id: uuidv4(),
      });
    }
    return dices;
  };

  const [dices, setDices] = useState(() => initDices());
  const [frozenDices, setFrozenDices] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const addDiceAnimation = (onReset = false) => {
    const diceElements = onReset
      ? document.querySelectorAll(".dice")
      : document.querySelectorAll(".dice:not(.frozen)");
    diceElements.forEach((diceElement) => {
      diceElement.classList.add("roll");
    });

    setTimeout(() => {
      diceElements.forEach((diceElement) => {
        diceElement.classList.remove("roll");
      });
    }, 200);
  };

  const rollDices = () => {
    setDices(() => {
      return dices.map((dice) => {
        if (dice.frozen) return dice;
        else return { ...dice, value: Math.floor(Math.random() * 6) + 1 };
      });
    });

    addDiceAnimation();
  };

  const freezeDice = (diceData) => {
    const { id, frozen } = diceData;
    return () => {
      setDices(() => {
        return dices.map((dice) => {
          if (dice.id === id) {
            return { ...dice, frozen: !dice.frozen };
          }
          return dice;
        });
      });

      setFrozenDices((prev) => {
        return frozen
          ? prev.filter((dice) => dice.id !== id)
          : [...prev, { ...diceData, frozen: !frozen }];
      });
    };
  };

  const resetGame = () => {
    setDices(() => initDices());
    setFrozenDices([]);
    setGameOver(false);
    setTimeout(() => {
      addDiceAnimation(true);
    }, 25);
  };

  const checkForWin = () => {
    return (
      frozenDices.every((dice) => dice.value === frozenDices[0].value) &&
      frozenDices.length === dices.length
    );
  };

  useEffect(() => {
    checkForWin() && setGameOver(true);
  }, [frozenDices]);

  const allDices = dices.map((dice) => {
    return <Dice diceData={dice} key={dice.id} freezeDice={freezeDice} />;
  });

  return (
    <Fragment>
      {gameOver && <Confetti />}
      <div className="dice-container">{allDices}</div>
      <button
        type="button"
        onClick={() => (gameOver ? resetGame() : rollDices())}
      >
        {gameOver ? "Play Again" : "Roll"}
      </button>
    </Fragment>
  );
};

export default Tenzies;
