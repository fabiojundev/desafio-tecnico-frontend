import { ICard } from "../types/card.type";

export enum BoardActionTypes {
  CreateCard = "CreateCard",
  UpdateCard = "UpdateCard",
  RetrieveCards = "RetrieveCards",
  DeleteCard = "DeleteCard",
}

export interface ICreateCardAction {
  type: BoardActionTypes.CreateCard;
  payload: ICard;
}

export interface IRetrieveCardsAction {
  type: BoardActionTypes.RetrieveCards;
  payload: ICard[];
}

export interface IUpdateCardAction {
  type: BoardActionTypes.UpdateCard;
  payload: ICard;
}

export interface IDeleteCardAction {
  type: BoardActionTypes.DeleteCard;
  payload: string;
}

export type BoardActions =
  | ICreateCardAction
  | IRetrieveCardsAction
  | IUpdateCardAction
  | IDeleteCardAction;

export const createCardAction = (card: ICard): ICreateCardAction => ({
  type: BoardActionTypes.CreateCard,
  payload: card,
});

export const retrieveCardsAction = (cards: ICard[]): IRetrieveCardsAction => ({
  type: BoardActionTypes.RetrieveCards,
  payload: cards,
});

export const udpateCardAction = (card: ICard): IUpdateCardAction => ({
  type: BoardActionTypes.UpdateCard,
  payload: card,
});

export const deleteCardAction = (id: string): IDeleteCardAction => ({
  type: BoardActionTypes.DeleteCard,
  payload: id,
});
