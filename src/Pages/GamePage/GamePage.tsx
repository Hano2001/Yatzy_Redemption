import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Types";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { numbers } from "../../Data/GameBoard";
import Round from "../../Components/Round";

const GamePage = () => {
  const { players, boardItems, setBoardItems } = useContext(ContextInfo);
  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      players.map((player: Iplayers) => {
        let tableCord = `${player.id}:${i}`;
        let dieSide = i;
        let newBoardItem = {
          playerId: player.id,
          tableCord: tableCord,
          value: 0,
          dieSide: dieSide,
        };
        setBoardItems((prevBoard: any) => [...prevBoard, newBoardItem]);
      });
    }
  }, []);

  function TableRow(props: { name: string; num: number }) {
    return (
      <tr>
        <th>{props.name}</th>
        {players.map((player: Iplayers) => {
          let tableCord = `${player.id}:${props.num}`;
          let obj = boardItems.find(
            (item: { tableCord: string }) => item.tableCord === tableCord
          );
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
            let score = player.score >= 63 ? 50 : 0;
            return <td key={player.id}>{score}</td>;
          })}
        </tr>
      </>
    );
  }

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

      <Round />
      <button onClick={() => console.log(boardItems)}>TEST</button>
      <button onClick={() => console.log(players)}>See Players</button>
    </div>
  );
};

export default GamePage;
