import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Board from "./Board";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

const card1: ICard = {
  id: "uuid-1234",
  titulo: "Titulo1",
  conteudo: "Conteudo1",
  lista: Lista.Doing,
};

afterEach(cleanup);

const getCards = jest.fn(async () => [card, card1]);
const createCard = jest.fn(async () => card);
const updateCard = jest.fn(async () => card1);
const deleteCard = jest.fn(async () => card);


const customRender = () => {
  render(<Board
    getCards={getCards}
    createCard={createCard}
    updateCard={updateCard}
    deleteCard={deleteCard}
  />);
};

describe("Render Board", () => {
  it("Renders Board", () => {
    customRender();

    screen.getByText(/Novo/i);
    screen.getByText(/To Do/i);
    screen.getByText(/Doing/i);
    screen.getByText(/Done/i);
    act(() => {
      screen.getByTitle(/Adicionar/i);
    });
  });

  it("Delete existing cards", async () => {

    customRender();
    act(() => {
      new Promise(resolve => setTimeout(resolve, 1));
    });

    screen.debug();
    const trashCards = screen.queryAllByTitle(/Excluir/i);
    console.log("trash length", trashCards.length);
    trashCards.forEach(async (trash) => {
      act(() => {
        userEvent.click(trash);
      });
      await waitFor(() => {
        expect(trash).not.toBeInTheDocument();
      });
    });

    expect(screen.queryAllByTitle(/Excluir/i).length).toBe(0);
  });

  it.skip("Create new card", async () => {
    customRender();

    expect(screen.queryAllByTitle(/card\-/i)).toEqual([]);

    screen.getByTitle(/new-card/i);
    userEvent.type(screen.getByPlaceholderText(/Título/i), card.titulo);
    userEvent.type(screen.getByPlaceholderText(/Conteúdo/i), card.conteudo);
    act(() => {
      userEvent.click(screen.getByTitle(/Adicionar/i));
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título/i)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Conteúdo/i)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByText(/Titulo/i)).toBeInTheDocument();
    });
    expect(screen.queryAllByTitle(/card\-/i)).toHaveLength(1);
  });


});