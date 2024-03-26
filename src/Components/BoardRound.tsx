import React, { useContext } from "react";
import { ContextInfo } from "../Contexts/ContextInfo";
import Iplayers from "./Interfaces/players";

export default function BoardRound(props: { name: string; num: number }) {
  const { players, boardItems, turnCount, activeCellArr } =
    useContext(ContextInfo);
  return (
    <tr>
      <th>{props.name}</th>
      {players.map((player: Iplayers) => {
        let tableCord = `${player.id}:${props.num}`;
        let obj = boardItems.find(
          (item: { tableCord: string }) => item.tableCord === tableCord
        );
        let cellValue = obj?.value.toString();

        let activeCell: React.CSSProperties =
          tableCord === activeCellArr[turnCount] ? { background: "gray" } : {};

        return (
          <td style={activeCell} key={tableCord}>
            {cellValue}
          </td>
        );
      })}
    </tr>
  );
}
