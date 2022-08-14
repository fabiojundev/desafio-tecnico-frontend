import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Board from "./Board";
import { ICard, Lista } from "../../types/card.type";
import { act } from "react-dom/test-utils";


afterEach(cleanup);

const mockCard = (qty: number = 0) => {
  return Array.from({ length: qty }, (v, k) => ({
    id: `uuid-${k}`,
    titulo: `Titulo${k}`,
    conteudo: `Conteudo${k}`,
    lista: Lista.ToDo,
  }));
}

const card = mockCard(1)[0];
const card1 = mockCard(2)[1];

const customRender = (cardQty: number = 0) => {
  const cards = mockCard(cardQty);

  const getCards = jest.fn().mockResolvedValue(cards);
  const createCard = jest.fn().mockResolvedValue(card);
  const updateCard = jest.fn().mockResolvedValue(card1);
  const deleteCard = jest.fn().mockResolvedValue(card);

  render(
    <Board
      getCards={getCards}
      createCard={createCard}
      updateCard={updateCard}
      deleteCard={deleteCard}
    />,
  );
};

describe("Render Board", () => {
  it("Renders Board", async () => {
    await act(async () => {
      customRender();
    });

    screen.getByText(/Novo/i);
    screen.getByText(/To Do/i);
    screen.getByText(/Doing/i);
    screen.getByText(/Done/i);
    screen.getByTitle(/Adicionar/i);
  });

  it("Delete existing cards", async () => {
    await act(async () => {
      customRender(2);
    });

    const trashCards = screen.queryAllByTitle(/Excluir/i);

    for (const trash of trashCards) {
      await act(async () => {
        userEvent.click(trash);
      });

      await waitFor(() => {
        expect(trash).not.toBeInTheDocument();
      });
    }

    expect(screen.queryAllByTitle(/Excluir/i).length).toBe(0);
  });

  it("Create new card", async () => {
    await act(async () => {
      customRender();
    });

    expect(screen.queryByText(/Titulo0/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Conteudo0/i)).not.toBeInTheDocument();

    screen.getByTitle(/Adicionar/i);
    userEvent.type(screen.getByPlaceholderText(/Título/i), card.titulo);
    userEvent.type(screen.getByPlaceholderText(/Conteúdo/i), card.conteudo);

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);
    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);

    await act(async () => {
      await userEvent.click(screen.getByTitle(/Adicionar/i));
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título/i)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Conteúdo/i)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByText(/Titulo0/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Conteudo0/i)).toBeInTheDocument();
    });
  });

  it.skip("Move card to the right", async () => {
    await act(async () => {
      customRender(1);
    });

    const todoList = screen.getByTitle(/To Do/i);
    const doingList = screen.getByTitle(/Doing/i);
    const doneList = screen.getByTitle(/Done/i);

    // todoList.querySelector("")

    const moveRight = screen.getByTitle(/Mover p\/ Direita/i);
    expect(moveRight).toBeEnabled();
    // screen.debug();

    await act(async () => {
      await userEvent.click(moveRight);
    });

    await act(async () => {
      await userEvent.click(moveRight);
    });

    await waitFor(() => {
      expect(moveRight).not.toBeEnabled();
    });

    screen.debug();

  });


});
