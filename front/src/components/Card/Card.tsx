import { useState } from "react";
import { ICard } from "../../types/card.type";
import { CardContainer } from "./Card.styles";

import CardEdit from "./CardEdit";
import CardView from "./CardView";

interface ICardProps {
  card: ICard;
}

function Card({ card }: ICardProps) {
  const [isEditing, setEditing] = useState(false);

  return (
    <CardContainer>
      {card.id && !isEditing ? (
        // Show Card
        <CardView card={card} setEditing={setEditing} />
      ) : (
        // Edit card
        <CardEdit card={card} setEditing={setEditing} />
      )}
    </CardContainer>
  );
}

export default Card;
