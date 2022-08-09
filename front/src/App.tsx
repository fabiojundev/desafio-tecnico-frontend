import React from "react";
import "./App.css";
import GlobalStyle from "./styles/global";

import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Board />
    </div>
  );
}

export default App;
