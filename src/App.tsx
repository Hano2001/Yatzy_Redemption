import React, { useState } from "react";
import "./App.css";
import Iplayers from "./Components/Types"
import Board from "./Components/Board";
import { Outlet } from "react-router";
import { ContextInfo } from "./Contexts/ContextInfo";


function App() {
  const [players, setPlayers] = useState<Array<Iplayers>>([]);
 const contextValues = {
  players, setPlayers
 }
  return (
    <ContextInfo.Provider value={contextValues}>
    <><Outlet/></></ContextInfo.Provider>)
}

export default App;
