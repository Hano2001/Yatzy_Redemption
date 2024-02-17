import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";

interface IboardItem {
  playerId: number;
  tableCord: string;
  value: number;
}
const GamePage = () => {
  const [boardItems, setBoardItems] = useState<IboardItem[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      players.map((player: Iplayers) => {
        let tableCord = `${player.id}:${i}`;
        let newBoardItem = {
          playerId: player.id,
          tableCord: tableCord,
          value: 0,
        };
        setBoardItems((prevBoard) => [...prevBoard, newBoardItem]);
      });
    }
  }, []);

  function TableRow(props: { name: string; num: number }) {
    return (
      <tr>
        <th>{props.name}</th>
        {players.map((player: Iplayers) => {
          let tableCord = `${player.id}:${props.num}`;
          let obj = boardItems.find((item) => item.tableCord === tableCord);
          let cellValue = obj?.value.toString();

          return <td key={tableCord}>{cellValue}</td>;
        })}
      </tr>
    );
  }
  function ResultRow(props: { name: string }) {
    return (
      <>
        <tr>
          <th>{props.name}</th>

          {players.map((player: Iplayers) => {
            return <td key={player.id}>{player.score}</td>;
          })}
        </tr>
      </>
    );
  }
  function BonusRow(props: { name: string }) {
    return (
      <>
        <tr>
          <th>{props.name}</th>

          {players.map((player: Iplayers) => {
            let score = player.score >= 63 ? 50 : 0
            return <td key={player.id}>{score}</td>;
          })}
        </tr>
      </>
    );
  }
  function TestUpdateValue() {
    let roundCord = boardItems[turnCount];
    function ValueUpdate(props: { roundVal: IboardItem }) {
      function test() {
        let newArr = [...boardItems];
        let itemIndex = boardItems.findIndex(
          (obj) => obj.tableCord === props.roundVal.tableCord
        );
        newArr[itemIndex].value = 15;
        console.log(newArr);
        setBoardItems(newArr);
        let playerIndex = players.findIndex(
          (obj: Iplayers) => obj.id == props.roundVal.playerId
        );
        players[playerIndex].score += 15;
      }

      return (
        <>
          <button onClick={test}>Set Score</button>
          <button onClick={() => console.log(props.roundVal.playerId)}>
            See PlayerId
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
  const { players } = useContext(ContextInfo);
  return (
    <div>
      <h1>gamepage</h1>
      <table>
        <tbody>
          <tr>
            <th>Round</th>
            {players.map((player: Iplayers) => {
              return <th>{player.name}</th>;
            })}
          </tr>

          {numbers.map((number) => {
            return <TableRow name={number.name} num={number.number} />;
          })}
          <ResultRow name="Score" />
          <BonusRow name="Bonus" />
        </tbody>
      </table>

      <TestUpdateValue />
      <button onClick={() => console.log(boardItems)}>TEST</button>
      <button onClick={() => console.log(players)}>See Players</button>
    </div>
  );
};

export default GamePage;
