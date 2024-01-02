import React, { useState } from 'react'
import Iplayers from '../../Components/Types';

interface Props {}

const HomePage = (props: Props) => {
    let [players, setPlayers] = useState<Array<Iplayers>>([]);
    function handleSubmit(e: any) {
      e.preventDefault();
  
      const newPlayer: Iplayers = { id: players.length, name: e.target.name.value };
      setPlayers([...players, newPlayer]);
    }
    return (
      <div className="App">
        <h1>Yatzy Redemption</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Player Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Add Player"/>
        </form>
  
        {players.map((player) => {
          return (
            <>
              <h6>{player.name}</h6>
              <p>{player.id}</p>
            </>
          );
        })}

      </div>
    );
}

export default HomePage