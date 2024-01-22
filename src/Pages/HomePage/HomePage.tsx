import React, { useContext, useState } from "react";
import Iplayers from "../../Components/Types";
import { Link } from "react-router-dom";
import { ContextInfo } from "../../Contexts/ContextInfo";

interface Props {}

const HomePage = (props: Props) => {
  const [inputvalue, setInputValue] = useState(true);
  const { players, setPlayers } = useContext(ContextInfo);

  function HandleSubmit(e: any) {
    e.preventDefault();
    const newPlayer: Iplayers = {
      id: players.length,
      name: e.target.name.value,
    };
    setPlayers([...players, newPlayer]);
    e.target.name.value = "";
    setInputValue(true);
  }
  function HandleOnChange(e: any) {
    setInputValue(e.target.value === "");
  }
  function RemovePlayer(index: number) {
    let newArr = [...players];
    newArr.splice(index, 1);
    setPlayers(newArr);
  }
  return (
    <div className="App">
      <h1>Yatzy Redemption</h1>
      <form onSubmit={HandleSubmit}>
        <label>
          Player Name:
          <input onChange={HandleOnChange} type="text" name="name" />
        </label>
        <input disabled={inputvalue} type="submit" value="Add Player" />
      </form>

      {players.map((player: Iplayers, index: number) => {
        return (
          <div key={player.id}>
            <h6>{player.name}</h6>
            <p>{player.id}</p>
            <button onClick={() => RemovePlayer((index = index))}>
              REMOVE
            </button>
          </div>
        );
      })}
      <Link to="/gamepage">Game</Link>
    </div>
  );
};

export default HomePage;
