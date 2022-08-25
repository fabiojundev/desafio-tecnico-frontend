import { ICard, Lista } from "../types/card.type";

export interface BoardState {
  cards: ICard[];
  loading: boolean;
  error: string;
}

export const initialState: BoardState = {
  cards: [],
  loading: false,
  error: "",
};

export const newCard: ICard = {
  titulo: "",
  conteudo: "",
  lista: Lista.New,
};
