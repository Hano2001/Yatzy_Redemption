import { useContext, useEffect } from "react";
import Iplayers from "../../Components/Interfaces/players";
import { ContextInfo } from "../../Contexts/ContextInfo";
import { RoundTwo, roundOne } from "../../Data/GameBoard";
import Round from "../../Components/Round";
import IboardItem from "../../Components/Interfaces/boardItems";
import BoardRound from "../../Components/BoardRound";
import RoundHeading from "../../Components/RoundHeading";
const GamePage = () => {
  const { players, setBoardItems, setActiveCellArr } = useContext(ContextInfo);
  useEffect(() => {
    for (let i = 1; i <= 15; i++) {
      players.forEach((player: Iplayers) => {
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
  }, [players]);

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
            let bonus = player.bonus ? "YES" : "-";
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
        <RoundHeading name={"1"} />

        <tbody>
          {roundOne.map((round) => {
            return (
              <BoardRound
                key={round.number}
                name={round.name}
                num={round.number}
              />
            );
          })}
          <ResultRow round="first" />
          <BonusRow name="Bonus" />
        </tbody>
        <RoundHeading name={"2"} />
        <tbody>
          {RoundTwo.map((round) => {
            return (
              <BoardRound
                key={round.number}
                name={round.name}
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
