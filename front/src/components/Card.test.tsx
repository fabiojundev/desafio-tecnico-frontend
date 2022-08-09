import { render, screen, cleanup } from "@testing-library/react";
import Card from "./Card";
import ICard from "../types/card.type";

const card: ICard = {
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: "ToDo",
};

afterEach(cleanup);

const handleCreate = jest.fn();
const handleUpdate = jest.fn();
const handleDelete = jest.fn();

const customRender = (card: ICard, isNew?: boolean) => {
  render(
    <Card
      card={card}
      isNew={isNew}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />,
  );
};

describe("Card", () => {
  it("Renders Card", () => {
    customRender(card);
    const title = screen.getByPlaceholderText(/Título/i);
    expect(title).toHaveValue(card.titulo);

    const conteudo = screen.getByPlaceholderText(/Conteúdo/i);
    expect(conteudo).toHaveValue(card.conteudo);

    const lista = screen.getByPlaceholderText(/Lista/i);
    expect(lista).toHaveValue(card.lista);
  });

  it("Renders create Card", () => {
    card.lista = "";
    customRender(card, true);
    const title = screen.getByPlaceholderText(/Título/i);
    expect(title).toHaveValue(card.titulo);

    const conteudo = screen.getByPlaceholderText(/Conteúdo/i);
    expect(conteudo).toHaveValue(card.conteudo);

    expect(screen.queryByPlaceholderText(/Lista/i)).not.toBeInTheDocument();
  });
});
