export enum Lista {
  New = "",
  ToDo = "ToDo",
  Doing = "Doing",
  Done = "Done",
}

export interface ICard {
  id?: string | null;
  titulo: string;
  conteudo: string;
  lista: Lista;
}

export interface ICardError {
  field: string;
  msg: string;
}
