type Lista = "ToDo" | "Doing" | "Done" | "";

export default interface ICard {
  id?: string | null;
  titulo: string;
  conteudo: string;
  lista: Lista;
}
