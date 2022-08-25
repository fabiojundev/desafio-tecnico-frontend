import React from "react";
import { initialState, BoardState } from "./state";
import { ICard } from "../types/card.type";

export const BoardContext = React.createContext<{
  state: BoardState;
  createCardApi: (card: ICard) => void;
  retrieveCardsApi: () => void;
  updateCardApi: (card: ICard) => void;
  deleteCardApi: (id: string) => void;
}>({
  state: initialState,
  createCardApi: (card: ICard) => card,
  retrieveCardsApi: () => {},
  updateCardApi: (card: ICard) => card,
  deleteCardApi: (id: string) => id,
});
