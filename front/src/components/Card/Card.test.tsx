import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Card from "./Card";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

afterEach(cleanup);

const handleCreate = jest.fn();
const handleUpdate = jest.fn();
const handleDelete = jest.fn();

const customRender = (ocard: ICard) => {
  render(
    <Card
      card={ocard}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />,
  );
};

describe("Card", () => {
  it("Renders create card", () => {
    customRender({
      ...card,
      id: "",
      lista: Lista.New,
    });

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);

    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);

    screen.getByTitle(/Adicionar/i);
  });

  it("Renders card on read mode", () => {
    customRender(card);

    screen.getByTitle(/Título/i);

    screen.getByTitle(/Conteúdo/i);

    screen.getByTitle(/Editar/i);

    screen.getByTitle(/Mover p\/ Esquerda/i);

    screen.getByTitle(/Excluir/i);

    screen.getByTitle(/Mover p\/ Direita/i);
  });

  it("Renders card on edit mode", () => {
    customRender(card);

    fireEvent.click(screen.getByTitle(/Editar/i));

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);

    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);

    screen.getByTitle(/Cancelar/i);

    screen.getByTitle(/Salvar/i);
  });
});
