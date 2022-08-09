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
import { ICard, Lista } from "../../types/card.type";
import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  IconContainer,
} from "./Card.styles";

interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => void;
  handleUpdate: (card: ICard) => void;
  handleDelete: (card: ICard) => void;
}

function Card({ card, handleCreate, handleUpdate, handleDelete }: ICardProps) {
  const [values, setValues] = useState(card);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createCard = () => {
    console.log("createCard", values);
    handleCreate({
      ...values,
      lista: Lista.ToDo,
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
            <CardFooter>
              <IconContainer
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <FaBan title="Cancelar" />
              </IconContainer>
              <IconContainer>
                <FaSave title="Salvar" />
              </IconContainer>
            </CardFooter>
          )}
        </form>
      ) : (
        <>
          <CardHeader>
            <CardTitle title="Título">{values.titulo}</CardTitle>
            <IconContainer onClick={() => setIsEditing(true)}>
              <FaEdit title="Editar" />
            </IconContainer>
          </CardHeader>
          <CardBody title="Conteúdo">{values.conteudo}</CardBody>
          <CardFooter>
            <IconContainer>
              <FaChevronCircleLeft title="Mover p/ Esquerda" />
            </IconContainer>
            <IconContainer onClick={() => handleDelete(values)}>
              <FaTrashAlt title="Excluir" />
            </IconContainer>
            <IconContainer>
              <FaChevronCircleRight title="Mover p/ Direita" />
            </IconContainer>
          </CardFooter>
        </>
      )}
    </CardContainer>
  );
}

export default Card;
