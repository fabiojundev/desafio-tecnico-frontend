import { useState, useEffect } from "react";
// import styled from "styled-components";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "../../utils/api-client";
import { ICard, Lista } from "../../types/card.type";
import { Card } from "../Card";
import {
  BoardContainer,
  ListContainer,
  ListHeader,
  ListTitle,
} from "./Board.styles";

function Board() {
  const [cards, setCards] = useState<ICard[]>([]);

  const getAllCards = async () => {
    const response = await getCards();
    console.log("getAllCards", response);
    if (response) {
      setCards(response);
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  const handleCreate = async (card: ICard) => {
    const response = await createCard(card);
    console.log("handleCreate", response);
    if (response) {
      setCards([...cards, response]);
    }
  };

  const handleUpdate = async (card: ICard) => {
    const response = await updateCard(card);
    console.log("handleUpdate", card, response);
    if (response) {
      setCards(cards.map((c) => (c.id === card.id ? card : c)));
    }
  };

  const handleDelete = async (card: ICard) => {
    const response = await deleteCard(card);
    console.log("handleDelete", card, response);
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
          <ListContainer key={list.id}>
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
