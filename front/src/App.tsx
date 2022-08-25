import React from "react";
import GlobalStyle from "./styles/global";

import {
  createCard,
  updateCard,
  deleteCard,
  getCards,
} from "./services/api-client";

import { Board } from "./components/Board";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Board
        createCard={createCard}
        getCards={getCards}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    </div>
  );
}

export default App;
