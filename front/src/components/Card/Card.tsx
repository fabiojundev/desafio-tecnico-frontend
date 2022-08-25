import { useState, useContext } from "react";
import { ICard } from "../../types/card.type";
import { CardContainer } from "./Card.styles";

import {
  BoardContext,
  updateCardAction,
  startRequestAction,
  setErrorAction,
  deleteCardAction,
  createCardAction,
} from "../../state";

import CardEdit from "./CardEdit";
import CardView from "./CardView";

interface ICardProps {
  card: ICard;
  createCard: (card: ICard) => Promise<ICard | undefined>;
  updateCard: (card: ICard) => Promise<ICard | undefined>;
  deleteCard: (id: string) => Promise<ICard[] | undefined>;
}

function Card({ card, createCard, updateCard, deleteCard }: ICardProps) {
  const { dispatch } = useContext(BoardContext);
  const [isEditing, setEditing] = useState(false);

  const handleCreate = async (aCard: ICard) => {
    dispatch(startRequestAction());

    try {
      const response = await createCard(aCard);

      if (response) {
        dispatch(createCardAction(response));
      }
    } catch (error) {
      if (typeof error?.message === 'string') {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  const handleUpdate = async (aCard: ICard) => {
    dispatch(startRequestAction());

    try {
      const response = await updateCard(aCard);

      if (response) {
        dispatch(updateCardAction(response));
      }
    } catch (error) {
      if (typeof error?.message === 'string') {
        dispatch(setErrorAction(error.message));
      }
    }
  };

  const handleDelete = async (id: string) => {
    dispatch(startRequestAction());

    try {
      const response = await deleteCard(id);

      if (response) {
        dispatch(deleteCardAction(id));
      }
    } catch (error) {
      if (typeof error?.message === 'string') {
        dispatch(setErrorAction(error.message));
      }
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
