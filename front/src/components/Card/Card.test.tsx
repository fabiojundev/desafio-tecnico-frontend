import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

const newCard: ICard = {
  id: "",
  titulo: "Titulo novo",
  conteudo: "Conteudo novo",
  lista: Lista.ToDo,
};

afterEach(cleanup);

const handleCreate = jest.fn();
const handleUpdate = jest.fn();
const handleDelete = jest.fn();
const title = /Título/i;
const content = /Conteúdo/i;
const add = /Adicionar/i;
const edit = /Editar/i;
const cancel = /Cancelar/i;
const moveRight = /Mover p\/ Direita/i;
const moveLeft = /Mover p\/ Esquerda/i;
const trash = /Excluir/i;

const customRender = (ocard: ICard) => {
  return render(
    <Card
      card={ocard}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />,
  );
};

describe("Render Cards", () => {
  it("Renders create card", () => {
    customRender(newCard);

    expect(screen.getByPlaceholderText(title)).toHaveValue(newCard.titulo);
    expect(screen.getByPlaceholderText(content)).toHaveValue(newCard.conteudo);

    screen.getByTitle(add);
  });

  it("Renders card on read mode", () => {
    customRender(card);

    screen.getByTitle(title);
    screen.getByTitle(content);
    screen.getByTitle(edit);
    screen.getByTitle(moveLeft);
    screen.getByTitle(trash);
    screen.getByTitle(moveRight);
  });

  it("Renders card on edit mode", () => {
    customRender(card);

    userEvent.click(screen.getByTitle(edit));

    expect(screen.getByPlaceholderText(title)).toHaveValue(card.titulo);
    expect(screen.getByPlaceholderText(content)).toHaveValue(card.conteudo);
    screen.getByTitle(cancel);
    screen.getByTitle(/Salvar/i);
  });
});
