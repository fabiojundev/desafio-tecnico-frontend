import { render, screen, cleanup } from "@testing-library/react";
import Card from "./Card";
import ICard from "../types/card.type";

const card: ICard = {
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: "ToDo",
};

afterEach(cleanup);

describe("Card", () => {
  const setCard = jest.fn();

  it("Renders Card", () => {
    render(<Card card={card} setCard={setCard} />);
    const title = screen.getByPlaceholderText(/Título/i);
    expect(title).toHaveValue(card.titulo);

    const conteudo = screen.getByPlaceholderText(/Conteúdo/i);
    expect(conteudo).toHaveValue(card.conteudo);

    const lista = screen.getByPlaceholderText(/Lista/i);
    expect(lista).toHaveValue(card.lista);
  });

  it("Renders Card with empty list", () => {
    card.lista = "";
    render(<Card card={card} setCard={setCard} />);
    const title = screen.getByPlaceholderText(/Título/i);
    expect(title).toHaveValue(card.titulo);

    const conteudo = screen.getByPlaceholderText(/Conteúdo/i);
    expect(conteudo).toHaveValue(card.conteudo);

    expect(screen.queryByPlaceholderText(/Lista/i)).not.toBeInTheDocument();
  });
});
