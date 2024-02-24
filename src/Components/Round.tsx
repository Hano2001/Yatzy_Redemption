import Dice from "./Dice";
import IboardItem from "./Interfaces/boardItems";
import Idice from "./Interfaces/dice";
import { ContextInfo } from "../Contexts/ContextInfo";
import { useContext, useState } from "react";
import Iplayers from "./Interfaces/players";

export default function Round() {
  let { boardItems, setBoardItems, players, turnCount, setTurnCount } =
    useContext(ContextInfo);
  let roundCord = boardItems[turnCount];
  let [dice, setDice] = useState<Idice[]>([]);
  let [tossCount, setTossCount] = useState(0);

  function DiceFuntion() {
    function DiceToss() {
      setDice(Dice(dice));
      setTossCount(tossCount + 1);
    }

    return (
      <>
        <button disabled={tossCount === 3} onClick={DiceToss}>
          Toss Dice
        </button>
      </>
    );
  }
  function DiceDisplay() {
    if (dice.length === 0) {
      return (
        <>
          <p>Toss the Dice!</p>
        </>
      );
    } else {
      return (
        <>
        <p>Tosses left: {3-tossCount}</p>
        <p>Round: {roundCord.dieSide}</p>
          {dice.map((die) => {
            let checked = die.locked;
            return (
              <>
              <div>
                <img src={require(`../DiceImages/${die.value}.png`)} alt={die.value.toString()} />
              </div>
                
                <input
                  onChange={() => {
                    die.locked = !die.locked;
                    console.log(checked);
                  }}
                  id="dieLock"
                  type="checkbox"
                  defaultChecked={checked}
                />
                <label htmlFor="dieLock">Lock Die</label>
              </>
            );
          })}
        </>
      );
    }
  }

  function NextRound() {
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
    setTossCount(0);
    setDice([]);
  }
  return (
    <div>
      <button onClick={NextRound}>NEXT</button>
      <DiceFuntion />
      <DiceDisplay />
    </div>
  );
}
