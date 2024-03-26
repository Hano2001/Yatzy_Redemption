import React, { useContext } from "react";
import { ContextInfo } from "../Contexts/ContextInfo";
import Iplayers from "./Interfaces/players";

export default function RoundHeading(props: { name: string}) {
    const {
        players,
      } = useContext(ContextInfo);
  return <thead>
  <tr>
    <th>{`Round ${props.name}`}</th>

    {players.map((player: Iplayers) => {
      return <th key={player.id}>{player.name}</th>;
    })}
  </tr>
</thead>;
}
