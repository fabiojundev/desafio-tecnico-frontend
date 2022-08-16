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

const cardsPool = mockCard(3);
const card = cardsPool[0];
const card1 = cardsPool[1];
const title = /Titulo0/i;
const conteudo = /Conteudo0/i;
const moveRight = /Mover p\/ direita/i;
const moveLeft = /Mover p\/ esquerda/i;

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

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(conteudo)).not.toBeInTheDocument();

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
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(conteudo)).toBeInTheDocument();
    });
  });

  it("Move card to the right and to the left", async () => {
    await act(async () => {
      customRender(1);
    });

    const todoList = screen.getByTitle(/To Do/i);
    const doingList = screen.getByTitle(/Doing/i);
    const doneList = screen.getByTitle(/Done/i);

    expect(todoList).toHaveTextContent(title);
    expect(doingList).not.toHaveTextContent(title);
    expect(doneList).not.toHaveTextContent(title);

    expect(screen.queryByTitle(moveLeft)).toHaveAttribute("disabled");
    expect(screen.queryByTitle(moveRight)).not.toHaveAttribute("disabled");
    await act(async () => {
      userEvent.click(screen.getByTitle(moveRight));
    });

    await waitFor(() => {
      expect(doingList).toHaveTextContent(title);
    });
    expect(todoList).not.toHaveTextContent(title);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveRight));
    });

    await waitFor(() => {
      expect(doneList).toHaveTextContent(title);
    });
    expect(doingList).not.toHaveTextContent(title);

    expect(screen.queryByTitle(moveRight)).toHaveAttribute("disabled");

    //Not moved from the right
    await waitFor(() => {
      expect(doneList).toHaveTextContent(title);
    });

    //start moving back to left
    expect(screen.queryByTitle(moveLeft)).not.toHaveAttribute("disabled");

    await act(async () => {
      userEvent.click(screen.getByTitle(moveLeft));
    });

    await waitFor(() => {
      expect(doingList).toHaveTextContent(title);
    });
    expect(doneList).not.toHaveTextContent(title);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveLeft));
    });

    await waitFor(() => {
      expect(todoList).toHaveTextContent(title);
    });
    expect(doingList).not.toHaveTextContent(title);

    expect(screen.queryByTitle(moveLeft)).toHaveAttribute("disabled");
    expect(screen.queryByTitle(moveRight)).not.toHaveAttribute("disabled");
  });


});
