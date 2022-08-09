import { useState, useEffect } from "react";
// import styled from "styled-components";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "../../utils/api-client";
import ICard from "../../types/card.type";
import { Card } from "../Card";

function Board() {
  const [cards, setCards] = useState<ICard[]>([]);

  const getAllCards = async () => {
    const response = await getCards();
    console.log("response", response);
    if (response) {
      setCards(response);
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      getAllCards();
    }
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
    lista: "",
  };

  const lists = [
    { id: "ToDo", label: "To Do" },
    { id: "Doing", label: "Doing" },
    { id: "Done", label: "Done" },
  ];

  return (
    <div>
      <div>
        <h2>Novo</h2>
        <Card
          card={newCard}
          isNew
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            <h2>{list.label}</h2>
            {getListCards(list.id).map((card) => (
              <Card
                key={card.id}
                card={card}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
