import { useState } from "react";
import { ICard } from "../../types/card.type";
import { CardContainer } from "./Card.styles";

import { CardEdit } from "../CardEdit";
import { CardView } from "../CardView";

interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => Promise<void>;
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

function Card({ card, handleCreate, handleUpdate, handleDelete }: ICardProps) {
  const [isEditing, setEditing] = useState(false);

  return (
    <CardContainer>
      {!card.id || isEditing ? (
        <CardEdit
          {...card}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      ) : (
        // Show Card
        <CardView
          {...card}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          setEditing={setEditing}
        />
      )}
    </CardContainer>
  );
}

export default Card;
