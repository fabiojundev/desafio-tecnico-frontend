import React, { useEffect, useReducer } from "react";
import GlobalStyle from "./styles/global";
import { ICard } from "./types/card.type";
import {
  initialState,
  createCardAction,
  retrieveCardsAction,
  updateCardAction,
  deleteCardAction,
  startRequestAction,
  setErrorAction,
  boardReducer,
  BoardContext,
  // BoardState,
} from "./state";
import {
  createCard,
  updateCard,
  deleteCard,
  getCards,
} from "./services/api-client";

import { Board } from "./components/Board";

function App() {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const retrieveCardsApi = async () => {
    dispatch(startRequestAction());
    try {
      const response = await getCards();

      if (response) {
        dispatch(retrieveCardsAction(response));
      }
    } catch (error) {
      if (typeof error?.message === "string") {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  const createCardApi = async (aCard: ICard) => {
    dispatch(startRequestAction());

    try {
      const response = await createCard(aCard);

      if (response) {
        dispatch(createCardAction(response));
      }
    } catch (error) {
      if (typeof error?.message === "string") {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  const updateCardApi = async (aCard: ICard) => {
    dispatch(startRequestAction());

    try {
      const response = await updateCard(aCard);

      if (response) {
        dispatch(updateCardAction(response));
      }
    } catch (error) {
      if (typeof error?.message === "string") {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  const deleteCardApi = async (id: string) => {
    dispatch(startRequestAction());

    try {
      const response = await deleteCard(id);

      if (response) {
        dispatch(deleteCardAction(id));
      }
    } catch (error) {
      if (typeof error?.message === "string") {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  return (
    <div className="App">
      <GlobalStyle />
      <BoardContext.Provider
        value={{
          state,
          dispatch,
          retrieveCardsApi,
          createCardApi,
          updateCardApi,
          deleteCardApi
        }}
      >
        <Board />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
