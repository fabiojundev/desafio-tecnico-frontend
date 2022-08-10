import { render, screen, cleanup } from "@testing-library/react";
import Board from "./Board";
import { Card } from "../Card";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

afterEach(cleanup);

it("Renders Board", () => {
  render(<Board />);

  screen.getByText(/Novo/i);
  screen.getByText(/To Do/i);
  screen.getByText(/Doing/i);
  screen.getByText(/Done/i);
});
