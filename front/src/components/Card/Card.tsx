import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSave,
  FaBan,
} from "react-icons/fa";
import ICard from "../../types/card.type";
import { CardContainer, IconContainer } from "./Card.styles";

interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => void;
  handleUpdate: (card: ICard) => void;
  handleDelete: (card: ICard) => void;
}

function Card({
  card,
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
    console.log("createCard", values);
    handleCreate({
      ...values,
      lista: "ToDo",
    });
  };

  return (
    <CardContainer>
      {!values.id || isEditing ? (
        <form>
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
            value={values.conteudo}
          />
          {!values.id ? (
            <IconContainer onClick={createCard}>
              <FaPlusCircle title="Adicionar" /> Adicionar
            </IconContainer>
          ) : (
            <>
              <FaBan title="Cancelar"/>
              <FaSave title="Salvar" />
            </>
          )}
        </form>
      ) : (
        <>
          <h3 title="Título">{values.titulo}</h3>
          <FaEdit title="Editar" onClick={() => setIsEditing(true)} />
          <p title="Conteúdo">{values.conteudo}</p>
          <FaChevronCircleLeft title="Mover p/ Esquerda"/>
          <FaTrashAlt title="Excluir"/>
          <FaChevronCircleRight title="Mover p/ Direita"/>
        </>
      )}
    </CardContainer>
  );
}

export default Card;
