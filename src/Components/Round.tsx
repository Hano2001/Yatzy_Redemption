import Dice from "./Dice";
import Idice from "./Interfaces/dice";
import { ContextInfo } from "../Contexts/ContextInfo";
import { useContext, useState } from "react";
import Iplayers from "./Interfaces/players";
import Functions from "./Functions";

export default function Round() {
  let { boardItems, setBoardItems, players, turnCount, setTurnCount } =
    useContext(ContextInfo);
  let roundCord = boardItems[turnCount];
  let [dice, setDice] = useState<Idice[]>([]);
  let [rollCount, setRollCount] = useState(0);
  let [nextButtonDisable, setNextButtonDisable] = useState(true);

  function DiceFuntion() {
    function DiceRoll() {
      setDice(Dice(dice));
      setRollCount(rollCount + 1);
      setNextButtonDisable(false);
    }

    return (
      <>
        <button disabled={rollCount === 3} onClick={DiceRoll}>
          Roll Dice
        </button>
      </>
    );
  }
  function DiceDisplay() {
    if (dice.length === 0) {
      return (
        <>
          <p>Roll the Dice!</p>
        </>
      );
    } else {
      return (
        <>
          <p key={"RollsLeft"}>Rolls left: {3 - rollCount}</p>
          {dice.map((die, index) => {
            let checked = die.locked;
            return (
              <>
                <div>
                  <img
                    key={index + "img"}
                    src={require(`../DiceImages/${die.value}.png`)}
                    alt={die.value.toString()}
                  />
                </div>

                <input
                  key={index + "input"}
                  onChange={() => {
                    die.locked = !die.locked;
                  }}
                  id="dieLock"
                  type="checkbox"
                  defaultChecked={checked}
                />
                <label key={index + "label"} htmlFor="dieLock">
                  Lock Die
                </label>
              </>
            );
          })}
        </>
      );
    }
  }

  function NextRound() {
    let newArr = [...boardItems];
    let itemIndex = boardItems.findIndex(
      (obj: { tableCord: string }) => obj.tableCord === roundCord.tableCord
    );
    let functionIndex = Number(roundCord.tableCord.split(":").reverse()[0]);

    let roundScore = roundCord.dieSide
      ? dice
          .filter((x) => x.value === roundCord.dieSide)
          .reduce((acc, obj) => acc + obj.value, 0)
      : Number(Functions({ arr: dice, num: functionIndex }));
    newArr[itemIndex].value = roundScore;

    setBoardItems(newArr);
    let playerIndex = players.findIndex(
      (obj: Iplayers) => obj.id === roundCord.playerId
    );
    roundCord.dieSide
      ? (players[playerIndex].firstRoundScore += roundScore)
      : (players[playerIndex].secondRoundScore += roundScore);

    if (players[playerIndex] >= 63) {
      players[playerIndex].bonus = true;
    }

    setTurnCount(turnCount + 1);
    setRollCount(0);
    setDice([]);
    setNextButtonDisable(true);
  }
  return (
    <div>
      <button disabled={nextButtonDisable} onClick={NextRound}>
        NEXT
      </button>
      <DiceFuntion />
      <DiceDisplay />
    </div>
  );
}
