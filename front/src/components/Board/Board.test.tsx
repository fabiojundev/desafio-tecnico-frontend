import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ICard, Lista } from "../../types/card.type";
import Board from "./Board";

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
const card1 = { ...cardsPool[0], lista: Lista.Doing };
const card2 = { ...cardsPool[0], lista: Lista.Done };
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

interface RenderProps {
  cardQty: number;
  getCardsCB?(): Promise<ICard[] | undefined>;
  createCardCB?(): Promise<ICard | undefined>;
  updateCardCB?(): Promise<ICard | undefined>;
  deleteCardCB?(): Promise<ICard[] | undefined>;
}

const customRender = async ({
  cardQty,
  getCardsCB,
  createCardCB,
  updateCardCB,
  deleteCardCB,
}: RenderProps) => {
  const cards = mockCard(cardQty);
  const getCards = jest.fn().mockResolvedValue(cards);
  const createCard = jest.fn().mockResolvedValue(card);
  const updateCard = jest.fn().mockResolvedValue(card1);
  const deleteCard = jest.fn().mockResolvedValue(mockCard(2));

  await act(async () => {
    render(
      <Board
        getCards={getCardsCB || getCards}
        createCard={createCardCB || createCard}
        updateCard={updateCardCB || updateCard}
        deleteCard={deleteCardCB || deleteCard}
      />,
    );
  });
};

describe("Render Board", () => {
  it("Renders Board", async () => {
    await customRender({ cardQty: 0 });

    screen.getByText(novo);
    screen.getByTitle(todo);
    screen.getByTitle(doing);
    screen.getByTitle(done);
    screen.getByTitle(add);
  });

  it("Delete existing cards", async () => {
    const dCards = mockCard(5);
    const deleteCard = jest
      .fn()
      .mockReturnValueOnce(dCards.filter((c, i) => i > 0))
      .mockReturnValueOnce(dCards.filter((c, i) => i > 1))
      .mockReturnValueOnce(dCards.filter((c, i) => i > 2))
      .mockReturnValueOnce(dCards.filter((c, i) => i > 3))
      .mockReturnValueOnce(dCards.filter((c, i) => i > 4));

    await customRender({ cardQty: 5, deleteCardCB: deleteCard });

    const trashCards = screen.queryAllByTitle(trash);
    expect(trashCards.length).toBe(5);

    let count = 0;
    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    for (const trashIcon of trashCards) {
      await act(async () => {
        userEvent.click(trashIcon);
      });
      count += 1;
      expect(deleteCard.mock.calls.length).toBe(count);

      await waitFor(() => {
        expect(trashIcon).not.toBeInTheDocument();
      });
    }
    /* eslint-enable */

    expect(screen.queryAllByTitle(trash).length).toBe(0);
  });

  it("Create new card", async () => {
    await customRender({ cardQty: 0 });

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
    const updateCard = jest
      .fn()
      .mockReturnValueOnce(card1) // doing
      .mockReturnValueOnce(card2) // done
      .mockReturnValueOnce(card1) // doing
      .mockReturnValueOnce(card); // to do

    await customRender({ cardQty: 1, updateCardCB: updateCard });

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
    expect(updateCard.mock.calls.length).toBe(1);

    await waitFor(() => {
      // doing
      expect(doingList).toHaveTextContent(titulo);
    });
    expect(todoList).not.toHaveTextContent(titulo);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveRight));
    });
    expect(updateCard.mock.calls.length).toBe(2);

    await waitFor(() => {
      // done
      expect(doneList).toHaveTextContent(titulo);
    });
    expect(doingList).not.toHaveTextContent(titulo);

    expect(screen.queryByTitle(moveRight)).toHaveAttribute("disabled");

    // Not moved from the right, still done
    await waitFor(() => {
      expect(doneList).toHaveTextContent(titulo);
    });

    // start moving back to left
    expect(screen.queryByTitle(moveLeft)).not.toHaveAttribute("disabled");

    await act(async () => {
      // doing
      userEvent.click(screen.getByTitle(moveLeft));
    });
    expect(updateCard.mock.calls.length).toBe(3);

    await waitFor(() => {
      expect(doingList).toHaveTextContent(titulo);
    });
    expect(doneList).not.toHaveTextContent(titulo);

    await act(async () => {
      userEvent.click(screen.getByTitle(moveLeft));
    });
    expect(updateCard.mock.calls.length).toBe(4);

    await waitFor(() => {
      expect(todoList).toHaveTextContent(titulo);
    });
    expect(doingList).not.toHaveTextContent(titulo);

    expect(screen.queryByTitle(moveLeft)).toHaveAttribute("disabled");
    expect(screen.queryByTitle(moveRight)).not.toHaveAttribute("disabled");
  });
});
