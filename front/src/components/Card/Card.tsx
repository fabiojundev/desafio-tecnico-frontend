import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import ICard from "../../types/card.type";
import { CardContainer, IconContainer } from "./Card.styles";

interface ICardProps {
  card: ICard;
  isNew?: boolean;
  handleCreate: (card: ICard) => void;
  handleUpdate: (card: ICard) => void;
  handleDelete: (card: ICard) => void;
}

function Card({
  card,
  isNew,
  handleCreate,
  handleUpdate,
  handleDelete,
}: ICardProps) {
  const [values, setValues] = useState(card);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createCard = () => {
    handleCreate({
      ...values,
      lista: "ToDo",
    });
  };

  return (
    <CardContainer>
      <form>
        {isNew || isEditing ? (
          <>
            <input
              name="titulo"
              type="text"
              placeholder="Título"
              value={values.titulo}
              onChange={onChange}
            />
            <textarea
              name="conteudo"
              placeholder="Conteúdo"
              onChange={onChange}
            >
              {values.conteudo}
            </textarea>

          </>
        ) : (
          <>
            <h3>{values.titulo}</h3>
            <FaEdit onClick={() => setIsEditing(true)} />
            <p>{values.conteudo}</p>
          </>
        )}
        {!isNew ? (
          !isEditing && (
            <>
              <FaChevronCircleLeft />
              <FaTrashAlt />
              <FaChevronCircleRight />
            </>
          )
        ) : (
          <IconContainer>
            <FaPlusCircle onClick={createCard} /> Adicionar
          </IconContainer>
        )}
      </form>
    </CardContainer>
  );
}

export default Card;
