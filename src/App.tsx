import React, { useState } from 'react';
import './App.css';

function App() {
  let [players, setPlayers] = useState([])
  function handleSubmit(e:any) {
    console.log(e)
    // let upDatePlayers = players.push(e.name)
    // setPlayers(upDatePlayers)
  }
  return (
    <div className="App">
      <h1>Yatzy Redemption</h1>
      <form onSubmit={() => {handleSubmit}}>
        <label>Player Name:
          <input type='text' name='name'/>
        </label>
        <input type="submit" value="Add Player" />
      </form>
      
      {players.map(player => {
        return <><h6>{player}</h6></>
      })}
    </div>
  );
}

export default App;
