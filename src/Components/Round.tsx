import Dice from "./Dice";
import IboardItem from "./Interfaces/boardItems";
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

  function DiceFuntion() {
    function DiceRoll() {
      setDice(Dice(dice));
      setRollCount(rollCount + 1);
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
          <p>Rolls left: {3 - rollCount}</p>
          <p>Round: {roundCord.dieSide}</p>
          {dice.map((die, index) => {
            let checked = die.locked;
            return (
              <>
                <div key={index + "div"}>
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
                    console.log(checked);
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
    if (roundCord.dieSide) {
      let roundScore = dice
        .filter((x) => x.value === roundCord.dieSide)
        .reduce((acc, obj) => acc + obj.value, 0);

      let newArr = [...boardItems];
      let itemIndex = boardItems.findIndex(
        (obj: { tableCord: string }) => obj.tableCord === roundCord.tableCord
      );
      newArr[itemIndex].value = roundScore;
      setBoardItems(newArr);
      let playerIndex = players.findIndex(
        (obj: Iplayers) => obj.id == roundCord.playerId
      );
      players[playerIndex].score += roundScore;
      setTurnCount(turnCount + 1);
      setRollCount(0);
      setDice([]);
    } else {
      let newArr = [...boardItems];
      let itemIndex = boardItems.findIndex(
        (obj: { tableCord: string }) => obj.tableCord === roundCord.tableCord
      );
      
      let functionIndex = Number(roundCord.tableCord.split(":").reverse()[0]);
      let roundScore = Functions({arr:dice, num:functionIndex})
      newArr[itemIndex].value = roundScore;
      setBoardItems(newArr);
      let playerIndex = players.findIndex(
        (obj: Iplayers) => obj.id == roundCord.playerId
      );
      players[playerIndex].score += roundScore;
      setTurnCount(turnCount + 1);
      setRollCount(0);
      setDice([]);
    }
  }
  return (
    <div>
      <button onClick={NextRound}>NEXT</button>
      <DiceFuntion />
      <DiceDisplay />
      <button onClick={() => console.log(boardItems)}>Board</button>
    </div>
  );
}
