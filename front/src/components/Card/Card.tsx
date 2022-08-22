import { useState, useEffect } from "react";
import { ICard } from "../../types/card.type";
import { CardContainer } from "./Card.styles";

import { CardEdit } from "./CardEdit";
import { CardView } from "./CardView";

interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => Promise<void>;
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

function Card({ card, handleCreate, handleUpdate, handleDelete }: ICardProps) {
  const [isEditing, setEditing] = useState(false);

  // useEffect(() => {
  //   console.count("CARD useEffect");
  // }, []);

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
