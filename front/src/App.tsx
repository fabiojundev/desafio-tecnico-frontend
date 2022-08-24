import { useEffect, useReducer } from "react";
import GlobalStyle from "./styles/global";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "./services/api-client";

import { Board } from "./components/Board";
import {
  initialState,
  retrieveCardsAction,
  boardReducer,
  BoardContext,
  BoardState,
  BoardActions,
} from "./state";

function App() {
  const [state, dispatch] = useReducer<any, BoardState>(
    boardReducer,
    initialState,
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const getAllCards = async () => {
      const response = await getCards();

      if (response) {
        console.log(response);
        dispatch(retrieveCardsAction(response));
      }
    };

    getAllCards();
  }, []);
  /* eslint-enable */
  return (
    <div className="App">
      <GlobalStyle />
      <BoardContext.Provider value={{ state, dispatch }}>
        <Board
          getCards={getCards}
          createCard={createCard}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
