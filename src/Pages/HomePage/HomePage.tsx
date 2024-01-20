import React, { useContext, useState } from "react";
import Iplayers from "../../Components/Types";
import { Link } from "react-router-dom";
import { ContextInfo } from "../../Contexts/ContextInfo";

interface Props {}

const HomePage = (props: Props) => {
  const { players, setPlayers } = useContext(ContextInfo);
  function handleSubmit(e: any) {
    e.preventDefault();
    const newPlayer: Iplayers = {
      id: players.length,
      name: e.target.name.value,
    };
    setPlayers([...players, newPlayer]);
    e.target.name.value = "";
  }
  return (
    <div className="App">
      <h1>Yatzy Redemption</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Add Player" />
      </form>

      {players.map((player: Iplayers) => {
        return (
          <div key={player.id}>
            <h6>{player.name}</h6>
            <p>{player.id}</p>
          </div>
        );
      })}
      <Link to="/gamepage">Game</Link>
    </div>
  );
};

export default HomePage;
