import React from "react";
import { initialState, BoardState } from "./state";
import { BoardActions } from "./actions";
import { ICard } from "../types/card.type";

export const BoardContext = React.createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardActions>;
  createCardApi: (card: ICard) => void;
  retrieveCardsApi: () => void;
  updateCardApi: (card: ICard) => void;
  deleteCardApi: (id: string) => void;
}>({
  state: initialState,
  dispatch: (action: BoardActions) => undefined,
  createCardApi: (card: ICard) => {},
  retrieveCardsApi: () => {},
  updateCardApi: (card: ICard) => {},
  deleteCardApi: (id: string) => {},
});
