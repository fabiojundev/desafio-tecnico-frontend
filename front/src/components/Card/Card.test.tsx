import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Card from "./Card";
import ICard from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: "ToDo",
};

afterEach(cleanup);

const handleCreate = jest.fn();
const handleUpdate = jest.fn();
const handleDelete = jest.fn();

const customRender = (card: ICard) => {
  render(
    <Card
      card={card}
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
      lista: "",
    });

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);

    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);

    expect(screen.queryByTitle(/Adicionar/i)).toBeInTheDocument();
  });

  it("Renders card on read mode", () => {
    customRender(card);

    expect(screen.queryByTitle(/Título/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Conteúdo/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Editar/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Mover p\/ Esquerda/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Excluir/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Mover p\/ Direita/i)).toBeInTheDocument();
  });

  it("Renders card on edit mode", () => {

    customRender(card);

    fireEvent.click(screen.getByTitle(/Editar/i));

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);

    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);

    expect(screen.queryByTitle(/Cancelar/i)).toBeInTheDocument();

    expect(screen.queryByTitle(/Salvar/i)).toBeInTheDocument();
  });

});
