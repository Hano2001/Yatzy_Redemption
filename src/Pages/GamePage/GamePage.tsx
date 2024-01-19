import React, { useContext, useState } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";

interface IboardItem {
  ref: string;
  value: Number;
}
const GamePage = () => {
  const [boardItems, setBoardItems] = useState<IboardItem[]>([]);
  function TableRow(props: { name: string; num?: number }) {
    return (
      <tr>
        <th>{props.name}</th>
        {players.map((player: Iplayers) => {
          let ref = `${player.id}:${props.num}`;
          let newBoardItem = { ref: ref, value: 0 };
          setBoardItems(prevBoard =>[...prevBoard,newBoardItem])
          return <td>0</td>;
        })}
      </tr>
    );
  }
  const { players } = useContext(ContextInfo);
  return (
    <div>
      <h1>gamepage</h1>
      <table>
        <tr>
          <th>Round</th>
          {players.map((player: any) => {
            return <th>{player.name}</th>;
          })}
        </tr>

        {numbers.map((number) => {
          return <TableRow name={number.name} num={number.number} />;
        })}
        <TableRow name="Score" />
        <TableRow name="Bonus" />
      </table>
      <button onClick={() => console.log(boardItems)}>TEST</button>
    </div>
  );
};

export default GamePage;
