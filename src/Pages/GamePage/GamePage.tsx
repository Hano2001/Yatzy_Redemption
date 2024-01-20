import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";

interface IboardItem {
  tableCord: string;
  value: Number;
}
const GamePage = () => {
  const [boardItems, setBoardItems] = useState<IboardItem[]>([]);
  useEffect(() => {
    players.map((player: Iplayers) => {
      for (let i = 1; i <= 6; i++) {
        let tableCord = `${player.id}:${i}`;
        let newBoardItem = { tableCord: tableCord, value: 0 };
        setBoardItems((prevBoard) => [...prevBoard, newBoardItem]);
      }
    });
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
            return <td key={player.id}>0</td>;
          })}
        </tr>
      </>
    );
  }
  function TestUpdateValue(e: any) {
    e.preventDefault();
    let cord = e.target.cord.value;
    let amount = Number(e.target.amount.value);
    let newArr = [...boardItems].map((item) => {
      if (item.tableCord === cord) {
        return { ...item, value: amount };
      } else return item;
    });
    setBoardItems(newArr);
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
          <ResultRow name="Bonus" />
        </tbody>
      </table>
      <form onSubmit={TestUpdateValue}>
        <label>
          Cord:
          <input type="text" name="cord" />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default GamePage;
