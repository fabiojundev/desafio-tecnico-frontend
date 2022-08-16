import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { act } from "react-dom/test-utils";
import Board from "./Board";
import { Lista } from "../../types/card.type";

afterEach(cleanup);

const mockCard = (qty: number = 0) => {
  return Array.from({ length: qty }, (v, k) => ({
    id: `uuid-${k}`,
    titulo: `Titulo${k}`,
    conteudo: `Conteudo${k}`,
    lista: Lista.ToDo,
  }));
};

const cardsPool = mockCard(3);
const card = cardsPool[0];
const card1 = cardsPool[1];
const title = /Título/i;
const content = /Conteúdo/i;
const conteudo = /Conteudo0/i;
const titulo = /Titulo0/i;
const add = /Adicionar/i;
const moveRight = /Mover p\/ direita/i;
const moveLeft = /Mover p\/ esquerda/i;
const trash = /Excluir/i;
const todo = /To Do/i;
const doing = /Doing/i;
const done = /Done/i;
const novo = /Novo/i;

const customRender = async (cardQty: number = 0) => {
  const cards = mockCard(cardQty);

  const getCards = jest.fn().mockResolvedValue(cards);
  const createCard = jest.fn().mockResolvedValue(card);
  const updateCard = jest.fn().mockResolvedValue(card1);
  const deleteCard = jest.fn().mockResolvedValue(card);

  await act(async () => {
    render(
      <Board
        getCards={getCards}
        createCard={createCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />,
    );
  });
};

describe("Render Board", () => {
  it("Renders Board", async () => {
    await customRender();

    screen.getByText(novo);
    screen.getByTitle(todo);
    screen.getByTitle(doing);
    screen.getByTitle(done);
    screen.getByTitle(add);
  });

  it("Delete existing cards", async () => {
    await customRender(5);

    const trashCards = screen.queryAllByTitle(trash);
    expect(trashCards.length).toBe(5);

    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    for (const trashIcon of trashCards) {
      await act(async () => {
        userEvent.click(trashIcon);
      });

      await waitFor(() => {
        expect(trashIcon).not.toBeInTheDocument();
      });
    }
    /* eslint-enable */

    expect(screen.queryAllByTitle(trash).length).toBe(0);
  });

  it("Create new card", async () => {
    await customRender();

    expect(screen.queryByText(titulo)).not.toBeInTheDocument();
    expect(screen.queryByText(conteudo)).not.toBeInTheDocument();

    screen.getByTitle(add);
    userEvent.type(screen.getByPlaceholderText(title), card.titulo);
    userEvent.type(screen.getByPlaceholderText(content), card.conteudo);

    expect(screen.getByPlaceholderText(title)).toHaveValue(card.titulo);
    expect(screen.getByPlaceholderText(content)).toHaveValue(card.conteudo);

    await act(async () => {
      await userEvent.click(screen.getByTitle(add));
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(title)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(content)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(conteudo)).toBeInTheDocument();
    });
  });

  it("Move card to the right and to the left", async () => {
    await customRender(1);

    const todoList = screen.getByTitle(todo);
    const doingList = screen.getByTitle(doing);
    const doneList = screen.getByTitle(done);

    expect(todoList).toHaveTextContent(titulo);
    expect(doingList).not.toHaveTextContent(titulo);
    expect(doneList).not.toHaveTextContent(titulo);

    expect(screen.queryByTitle(moveLeft)).toHaveAttribute("disabled");
    expect(screen.queryByTitle(moveRight)).not.toHaveAttribute("disabled");
    await act(async () => {
      userEvent.click(screen.getByTitle(moveRight));
    });

    await waitFor(() => {
      expect(doingList).toHaveTextContent(titulo);
    });
    expect(todoList).not.toHaveTextContent(titulo);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveRight));
    });

    await waitFor(() => {
      expect(doneList).toHaveTextContent(titulo);
    });
    expect(doingList).not.toHaveTextContent(titulo);

    expect(screen.queryByTitle(moveRight)).toHaveAttribute("disabled");

    // Not moved from the right
    await waitFor(() => {
      expect(doneList).toHaveTextContent(titulo);
    });

    // start moving back to left
    expect(screen.queryByTitle(moveLeft)).not.toHaveAttribute("disabled");

    await act(async () => {
      userEvent.click(screen.getByTitle(moveLeft));
    });

    await waitFor(() => {
      expect(doingList).toHaveTextContent(titulo);
    });
    expect(doneList).not.toHaveTextContent(titulo);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveLeft));
    });

    await waitFor(() => {
      expect(todoList).toHaveTextContent(titulo);
    });
    expect(doingList).not.toHaveTextContent(titulo);

    expect(screen.queryByTitle(moveLeft)).toHaveAttribute("disabled");
    expect(screen.queryByTitle(moveRight)).not.toHaveAttribute("disabled");
  });
});
