import Dice from "./Dice";
import IboardItem from "./Types";
import { ContextInfo } from "../Contexts/ContextInfo";
import { useContext } from "react";
import Iplayers from "./Types";

export default function Round() {
    let {boardItems,setBoardItems,players,turnCount,setTurnCount} = useContext(ContextInfo)
    let roundCord = boardItems[turnCount];
    let diceScore = Dice(4);
    function ValueUpdate(props: { roundVal: IboardItem }) {
      function test() {
        let newArr = [...boardItems];
        let itemIndex = boardItems.findIndex(
          (obj: { tableCord: string; }) => obj.tableCord === props.roundVal.tableCord
        );
        newArr[itemIndex].value = diceScore;
        setBoardItems(newArr);
        let playerIndex = players.findIndex(
          (obj: Iplayers) => obj.id == props.roundVal.playerId
        );
        players[playerIndex].score += diceScore;
      }

      return (
        <>
          <button onClick={test}>Set Score</button>
          <button onClick={() => console.log(roundCord)}>
            See Round
          </button>
        </>
      );
    }

    return (
      <div>
        <button onClick={() => setTurnCount(turnCount + 1)}>NEXT</button>
        <button onClick={() => console.log(roundCord)}>ROUNDCORD</button>
        <ValueUpdate roundVal={roundCord} />
      </div>
    );
  }
