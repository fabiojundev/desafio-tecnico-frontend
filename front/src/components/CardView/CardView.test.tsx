import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardView from "./CardView";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  id: "uuid-123",
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

afterEach(cleanup);

const handleUpdate = jest.fn();
const handleDelete = jest.fn();
const setEditing = jest.fn().mockResolvedValue(false);
const title = /Título/i;
const content = /Conteúdo/i;
const edit = /Editar/i;
const cancel = /Cancelar/i;
const moveRight = /Mover p\/ Direita/i;
const moveLeft = /Mover p\/ Esquerda/i;
const trash = /Excluir/i;

const customRender = () => {
  return render(
    <CardView
      card={card}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      setEditing={setEditing}
    />,
  );
};

describe("Render View Card", () => {
  it("Renders card on read mode", () => {
    customRender();

    screen.getByTitle(title);
    screen.getByTitle(content);
    screen.getByTitle(edit);
    screen.getByTitle(moveLeft);
    screen.getByTitle(trash);
    screen.getByTitle(moveRight);
  });

  it("Renders card on edit mode", () => {
    customRender();

    userEvent.click(screen.getByTitle(edit));

    expect(screen.getByPlaceholderText(title)).toHaveValue(card.titulo);
    expect(screen.getByPlaceholderText(content)).toHaveValue(card.conteudo);
    screen.getByTitle(cancel);
    screen.getByTitle(/Salvar/i);
  });
});
