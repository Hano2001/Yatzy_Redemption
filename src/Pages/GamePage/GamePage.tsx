import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";

interface IboardItem {
  playerId: Number;
  tableCord: string;
  value: Number;
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
            let playerScore = boardItems
              .filter((x) => x.playerId === player.id)
              .reduce((acc, curr) => acc + Number(curr.value), 0);
            return <td key={player.id}>{playerScore}</td>;
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
            return <td key={player.id}>0</td>;
          })}
        </tr>
      </>
    );
  }
  function TestUpdateValue() {
    let roundCord = boardItems[turnCount];
    function ValueUpdate(props:{roundVal:any}) {
      let newArr = [...boardItems].map((item) => {
        if (item.tableCord === props.roundVal.tableCord) {
          return { ...item, value: 5 };
        } else return item;
      });

      return (
        <>
          <button onClick={() => setBoardItems(newArr)}>Set Score</button>
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
      {/* <form onSubmit={TestUpdateValue}>
        <label>
          Cord:
          <input type="text" name="cord" />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <input type="submit" value="Update" />
      </form> */}
      <TestUpdateValue />
      <button onClick={() => console.log(boardItems)}>TEST</button>
    </div>
  );
};

export default GamePage;
