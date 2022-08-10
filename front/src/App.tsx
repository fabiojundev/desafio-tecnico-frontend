import React from "react";
import GlobalStyle from "./styles/global";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "./utils/api-client";


import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Board 
        getCards={getCards}
        createCard={createCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    </div>
  );
}

export default App;
