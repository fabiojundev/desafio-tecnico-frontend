import { BoardState } from "./state";
import { BoardActions, BoardActionTypes } from "./actions";

export const boardReducer = (
  state: BoardState,
  action: BoardActions,
): BoardState => {
  const { type, payload } = action;
  switch (type) {
    case BoardActionTypes.RetrieveCards:
      return {
        ...state,
        cards: payload,
      };

    case BoardActionTypes.CreateCard:
      return {
        ...state,
        cards: [...state.cards, payload],
      };

    case BoardActionTypes.UpdateCard:
      return {
        ...state,
        cards: state.cards.map((c) => (c.id === payload.id ? payload : c)),
      };

    case BoardActionTypes.DeleteCard:
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== payload),
      };

    default:
      return state;
  }
};
