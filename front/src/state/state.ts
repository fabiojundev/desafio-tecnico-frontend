import { ICard } from "../types/card.type";

export interface BoardState {
  cards: ICard[];
  loading?: boolean;
  error?: string;
}

export const initialState = { cards: [], loading: false, error: null };
