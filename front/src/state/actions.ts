import { ICard } from "../types/card.type";

export enum BoardActionTypes {
  CreateCard = "CreateCard",
  UpdateCard = "UpdateCard",
  RetrieveCards = "RetrieveCards",
  DeleteCard = "DeleteCard",
  StartRequest = "StartRequest",
  SetError = "SetError",
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
export interface IStartRequestAction {
  type: BoardActionTypes.StartRequest;
  payload: boolean;
}

export interface ISetErrorAction {
  type: BoardActionTypes.SetError;
  payload: string;
}

export type BoardActions =
  | ICreateCardAction
  | IRetrieveCardsAction
  | IUpdateCardAction
  | IDeleteCardAction
  | IStartRequestAction
  | ISetErrorAction;

export const createCardAction = (card: ICard): ICreateCardAction => ({
  type: BoardActionTypes.CreateCard,
  payload: card,
});

export const retrieveCardsAction = (cards: ICard[]): IRetrieveCardsAction => ({
  type: BoardActionTypes.RetrieveCards,
  payload: cards,
});

export const updateCardAction = (card: ICard): IUpdateCardAction => ({
  type: BoardActionTypes.UpdateCard,
  payload: card,
});

export const deleteCardAction = (id: string): IDeleteCardAction => ({
  type: BoardActionTypes.DeleteCard,
  payload: id,
});

export const startRequestAction = (): IStartRequestAction => ({
  type: BoardActionTypes.StartRequest,
  payload: true,
});

export const setErrorAction = (error: string): ISetErrorAction => ({
  type: BoardActionTypes.SetError,
  payload: error,
});
