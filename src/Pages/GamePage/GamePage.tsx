import React, { useContext } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";

interface props {}
const GamePage = (props: props) => {
  function TableRow(props: { name: string }) {
    return (
      <tr>
        <th>{props.name}</th>
        {players.map(() => {
          return <td><input type="number" /></td>;
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
          return <TableRow name={number.name} />;
        })}
        <TableRow name="Score" />
        <TableRow name="Bonus" />
      </table>
    </div>
  );
};

export default GamePage;
