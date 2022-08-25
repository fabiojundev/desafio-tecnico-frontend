import { useState, useContext } from "react";
import { ICard } from "../../types/card.type";
import { CardContainer } from "./Card.styles";

import {
  BoardContext,
  updateCardAction,
  deleteCardAction,
  createCardAction,
} from "../../state";
import { createCard, updateCard, deleteCard } from "../../services/api-client";

import CardEdit from "./CardEdit";
import CardView from "./CardView";

interface ICardProps {
  card: ICard;
}

function Card({ card }: ICardProps) {
  const { dispatch } = useContext(BoardContext);
  const [isEditing, setEditing] = useState(false);

  const handleCreate = async (aCard: ICard) => {
    const response = await createCard(aCard);

    if (response) {
      dispatch(createCardAction(response));
    }
  };

  const handleUpdate = async (aCard: ICard) => {
    const response = await updateCard(aCard);

    if (response) {
      dispatch(updateCardAction(response));
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteCard(id);

    if (response) {
      dispatch(deleteCardAction(id));
    }
  };

  return (
    <CardContainer>
      {card.id && !isEditing ? (
        // Show Card
        <CardView
          card={card}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          setEditing={setEditing}
        />
      ) : (
        // Edit card
        <CardEdit
          card={card}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      )}
    </CardContainer>
  );
}

export default Card;
