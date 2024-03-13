import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Interfaces/players";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { RoundTwo, roundOne } from "../../Data/GameBoard";
import Round from "../../Components/Round";
import IboardItem from "../../Components/Interfaces/boardItems";
const GamePage = () => {
  const { players, boardItems, setBoardItems } = useContext(ContextInfo);
  useEffect(() => {
    for (let i = 1; i <= 15; i++) {
      players.map((player: Iplayers) => {
        let newBoardItem =
          i < 7
            ? {
                playerId: player.id,
                tableCord: `${player.id}:${i}`,
                value: 0,
                dieSide: i,
              }
            : {
                playerId: player.id,
                tableCord: `${player.id}:${i}`,
                value: 0,
              };

        let newB;
        setBoardItems((prevBoard: Array<IboardItem>) => [
          ...prevBoard,
          newBoardItem,
        ]);
      });
    }
  }, []);

  function FirstRound(props: { name: string; num: number }) {
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

  function SecondRound(props: { name: string; function: string; num: number }) {
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
          <tr>Round 1</tr>
          <tr>
            <th></th>
            {players.map((player: Iplayers) => {
              return <th key={player.id}>{player.name}</th>;
            })}
          </tr>

          {roundOne.map((round) => {
            return (
              <FirstRound
                key={round.number}
                name={round.name}
                num={round.number}
              />
            );
          })}
          
          <BonusRow name="Bonus" />
          <tr>Round 2</tr>
          {RoundTwo.map((round) => {
            return (
              <SecondRound
                name={round.name}
                function={round.function}
                num={round.number}
              />
            );
          })}
          <ResultRow name="Score" />
        </tbody>
      </table>

      <Round />
      <button onClick={() => console.log(boardItems)}>TEST</button>
      {/* <button onClick={() => console.log(boardItems)}>TEST</button>
      <button onClick={() => console.log(players)}>See Players</button> */}
    </div>
  );
};

export default GamePage;
