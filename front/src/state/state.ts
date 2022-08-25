import { ICard } from "../types/card.type";

export interface BoardState {
  cards: ICard[];
  loading?: boolean;
  error?: string;
}

export const initialState: BoardState = {
  cards: [],
  loading: false,
  error: "",
};
