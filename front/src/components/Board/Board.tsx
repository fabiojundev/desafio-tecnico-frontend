import { useState, useEffect } from "react";
// import styled from "styled-components";
import { ICard, Lista } from "../../types/card.type";
import { Card } from "../Card";
import {
  BoardContainer,
  ListContainer,
  ListHeader,
  ListTitle,
} from "./Board.styles";

interface IBoardProps {
  getCards(): Promise<ICard[] | undefined>;
  createCard(card: ICard): Promise<ICard | undefined>;
  updateCard(card: ICard): Promise<ICard | undefined>;
  deleteCard(card: ICard): Promise<ICard | undefined>;
}

function Board({ getCards, createCard, updateCard, deleteCard }: IBoardProps) {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const getAllCards = async () => {
      const response = await getCards();

      if (response) {
        setCards(response);
      }
    };
    getAllCards();
  }, [getCards]);

  const handleCreate = async (card: ICard) => {
    const response = await createCard(card);

    if (response) {
      setCards([...cards, response]);
    }
  };

  const handleUpdate = async (card: ICard) => {
    const response = await updateCard(card);

    if (response) {
      setCards(cards.map((c) => (c.id === card.id ? card : c)));
    }
  };

  const handleDelete = async (card: ICard) => {
    const response = await deleteCard(card);

    if (response) {
      setCards(cards.filter((c) => c.id !== card.id));
    }
  };

  const getListCards = (list: string) => {
    return cards.filter((c) => c.lista === list);
  };

  const newCard: ICard = {
    titulo: "",
    conteudo: "",
    lista: Lista.New,
  };

  const lists = [
    { id: "ToDo", label: "To Do" },
    { id: "Doing", label: "Doing" },
    { id: "Done", label: "Done" },
  ];

  return (
    <BoardContainer>
      <ListContainer>
        <ListHeader>
          <ListTitle>Novo</ListTitle>
        </ListHeader>
        <Card
          card={newCard}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </ListContainer>
      <>
        {lists.map((list) => (
          <ListContainer key={list.id} title={list.label}>
            <ListHeader>
              <ListTitle>{list.label}</ListTitle>
            </ListHeader>
            {getListCards(list.id).map((card) => (
              <Card
                key={card.id}
                card={card}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </ListContainer>
        ))}
      </>
    </BoardContainer>
  );
}

export default Board;
