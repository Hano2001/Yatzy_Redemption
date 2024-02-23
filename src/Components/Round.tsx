import Dice from "./Dice";
import IboardItem from "./Interfaces/boardItems";
import Idice from "./Interfaces/dice";
import { ContextInfo } from "../Contexts/ContextInfo";
import { useContext, useState } from "react";
import Iplayers from "./Types";

export default function Round() {
  let { boardItems, setBoardItems, players, turnCount, setTurnCount } =
    useContext(ContextInfo);
  let roundCord = boardItems[turnCount];
  let [dice, setDice] = useState<Idice[]>([]);
  function ValueUpdate(props: { roundVal: IboardItem }) {
    function DiceToss() {
      setDice(Dice(roundCord.dieSide, dice));
      let newArr = [...boardItems];
      let itemIndex = boardItems.findIndex(
        (obj: { tableCord: string }) =>
          obj.tableCord === props.roundVal.tableCord
      );
      newArr[itemIndex].value = 5;
      setBoardItems(newArr);
      let playerIndex = players.findIndex(
        (obj: Iplayers) => obj.id == props.roundVal.playerId
      );
      players[playerIndex].score += 5;
    }

    return (
      <>
        <button onClick={DiceToss}>Toss Dice</button>
        <button onClick={() => console.log(roundCord.dieSide)}>
          See Round
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
          {dice.map((die) => {
            return <p key={die.id}>{die.value}</p>;
          })}
        </>
      );
    }
  }
  return (
    <div>
      <button onClick={() => setTurnCount(turnCount + 1)}>NEXT</button>
      <button onClick={() => console.log(roundCord)}>ROUNDCORD</button>
      <ValueUpdate roundVal={roundCord} />
      <DiceDisplay />
    </div>
  );
}
