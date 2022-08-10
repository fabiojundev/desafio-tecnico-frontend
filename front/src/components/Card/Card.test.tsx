import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

const newCard: ICard = {
  id: "",
  titulo: "Titulo novo",
  conteudo: "Conteudo novo",
  lista: Lista.ToDo,
};

const changedCard: ICard = {
  id: "uuid-987",
  titulo: "Titulo atualizado",
  conteudo: "Conteudo atualizado",
  lista: Lista.Doing,
};

afterEach(cleanup);

const handleCreate = jest.fn();
const handleUpdate = jest.fn();
const handleDelete = jest.fn();

const customRender = (ocard: ICard) => {
  return render(
    <Card
      card={ocard}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />,
  );
};

describe("Render Cards", () => {
  it("Renders create card", () => {
    customRender(newCard);

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(newCard.titulo);
    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(
      newCard.conteudo,
    );

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
});

describe("Create Card", () => {
  it("Create card", async () => {
    customRender(newCard);

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(newCard.titulo);
    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(
      newCard.conteudo,
    );

    act(() => {
      userEvent.click(screen.getByTitle(/Adicionar/i));
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Título/i)).toBeEmptyDOMElement();
      expect(screen.getByPlaceholderText(/Conteúdo/i)).toBeEmptyDOMElement();
    });
  });
});

describe("Edit Card", () => {
  it("Renders card on edit mode", () => {
    customRender(card);

    act(() => {
      fireEvent.click(screen.getByTitle(/Editar/i));
    });

    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue(card.titulo);
    expect(screen.getByPlaceholderText(/Conteúdo/i)).toHaveValue(card.conteudo);
    screen.getByTitle(/Cancelar/i);
    screen.getByTitle(/Salvar/i);
  });

  it("Edit card and cancel", async () => {
    customRender(card);

    userEvent.click(screen.getByTitle(/Editar/i));
    userEvent.type(screen.getByPlaceholderText(/Título/i), changedCard.titulo);
    userEvent.type(
      screen.getByPlaceholderText(/Conteúdo/i),
      changedCard.conteudo,
    );

    act(() => {
      userEvent.click(screen.getByTitle(/Cancelar/i));
    });

    await waitFor(() => {
      expect(screen.getByTitle(/Título/i)).toHaveTextContent(card.titulo);
      expect(screen.getByTitle(/Conteúdo/i)).toHaveTextContent(card.conteudo);
    });
  });

  it("Edit card and save", async () => {
    customRender(card);

    userEvent.click(screen.getByTitle(/Editar/i));
    userEvent.type(screen.getByPlaceholderText(/Título/i), changedCard.titulo);
    userEvent.type(
      screen.getByPlaceholderText(/Conteúdo/i),
      changedCard.conteudo,
    );

    act(() => {
      userEvent.click(screen.getByTitle(/Salvar/i));
    });

    await waitFor(() => {
      expect(screen.getByTitle(/Título/i)).toHaveTextContent(
        changedCard.titulo,
      );
      expect(screen.getByTitle(/Conteúdo/i)).toHaveTextContent(
        changedCard.conteudo,
      );
    });
  });
});
