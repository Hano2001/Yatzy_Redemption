import React, { useContext, useEffect, useState } from "react";
import Iplayers from "../../Components/Interfaces/players";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { RoundTwo, roundOne } from "../../Data/GameBoard";
import Round from "../../Components/Round";
import IboardItem from "../../Components/Interfaces/boardItems";
const GamePage = () => {
  const [activeCellArr, setActiveCellArr] = useState<Array<string>>([]);
  const { players, boardItems, setBoardItems, turnCount } =
    useContext(ContextInfo);
  useEffect(() => {
    for (let i = 1; i <= 15; i++) {
      players.forEach((player:Iplayers) => {
        let tableCord = `${player.id}:${i}`;
        let newBoardItem =
          i < 7
            ? {
                playerId: player.id,
                tableCord: tableCord,
                value: 0,
                dieSide: i,
              }
            : {
                playerId: player.id,
                tableCord: tableCord,
                value: 0,
              };

        setActiveCellArr((prevCellArr: Array<string>) => [
          ...prevCellArr,
          tableCord,
        ]);

        setBoardItems((prevBoard: Array<IboardItem>) => [
          ...prevBoard,
          newBoardItem,
        ]);
      });
    }
  },[players]);

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

          let activeCell: React.CSSProperties =
            tableCord === activeCellArr[turnCount]
              ? { background: "gray" }
              : {};

          return (
            <td style={activeCell} key={tableCord}>
              {cellValue}
            </td>
          );
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
          let activeCell: React.CSSProperties =
            tableCord === activeCellArr[turnCount]
              ? { background: "gray" }
              : {};
          return (
            <td style={activeCell} key={tableCord}>
              {cellValue}
            </td>
          );
        })}
      </tr>
    );
  }
  function ResultRow(props: { round: string }) {
    return (
      <>
        <tr>
          <th>Score</th>

          {players.map((player: Iplayers) => {
            return props.round === "second" ? (
              <td key={player.id}>
                {player.firstRoundScore + player.secondRoundScore}
              </td>
            ) : (
              <td key={player.id}>{player.firstRoundScore}</td>
            );
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
            let bonus = player.bonus ? "YES" : "-"
            return <td key={player.id}>{bonus}</td>;
          })}
        </tr>
      </>
    );
  }

  return (
    <div>
      <h1>gamepage</h1>
      <table>
        <thead>
          <tr>
            <th>Round 1</th>

            {players.map((player: Iplayers) => {
              return <th key={player.id}>{player.name}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {roundOne.map((round) => {
            return (
              <FirstRound
                key={round.number}
                name={round.name}
                num={round.number}
              />
            );
          })}
          <ResultRow round="first" />
          <BonusRow name="Bonus" />
        </tbody>
        {/* <tr>
            <td>Round 2</td>
          </tr> */}
        <thead>
          <tr>
            <th>Round 2</th>

            {players.map((player: Iplayers) => {
              return <th key={player.id}>{player.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {RoundTwo.map((round) => {
            return (
              <SecondRound
                key={round.number}
                name={round.name}
                function={round.function}
                num={round.number}
              />
            );
          })}
          <ResultRow round="second" />
        </tbody>
      </table>
      <Round />
    </div>
  );
};

export default GamePage;
