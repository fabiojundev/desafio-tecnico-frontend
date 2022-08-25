import React from "react";
import GlobalStyle from "./styles/global";

import { Board, BoardContextProvider } from "./components/Board";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </div>
  );
}

export default App;
