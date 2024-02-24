import React, { useState } from "react";
import "./App.css";
import Iplayers from "./Components/Interfaces/players";
import IboardItem from "./Components/Interfaces/boardItems";
import { Outlet } from "react-router";
import { ContextInfo } from "./Contexts/ContextInfo";

function App() {
  const [players, setPlayers] = useState<Array<Iplayers>>([]);
  const [boardItems, setBoardItems] = useState<Array<IboardItem>>([]);
  const [turnCount, setTurnCount] = useState(0);
  const contextValues = {
    players,
    setPlayers,
    boardItems,
    setBoardItems,
    turnCount,
    setTurnCount
  };
  return (
    <ContextInfo.Provider value={contextValues}>
      <>
        <Outlet />
      </>
    </ContextInfo.Provider>
  );
}

export default App;
