import { useEffect, useReducer } from "react";
import GlobalStyle from "./styles/global";
import { getCards } from "./services/api-client";

import { Board } from "./components/Board";
import {
  initialState,
  retrieveCardsAction,
  boardReducer,
  BoardContext,
  BoardState,
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
        <Board />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
