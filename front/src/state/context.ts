import React from "react";
import { initialState, BoardState } from "./state";
import { BoardActions } from "./actions";

export const BoardContext = React.createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
