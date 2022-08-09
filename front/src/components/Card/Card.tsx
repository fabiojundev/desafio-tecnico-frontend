import React, { useState } from "react";
import {
  FaBan,
  FaEdit,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaPlusCircle,
  FaSave,
  FaTrashAlt,
} from "react-icons/fa";
import DomPurify from "dompurify";
import { ICard, Lista, ICardError } from "../../types/card.type";
import {
  CardBody,
  CardContainer,
  CardFooter,
  CardForm,
  CardHeader,
  CardTitle,
  IconContainer,
} from "./Card.styles";

import TextInput from "../TextInput/TextInput";

interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => Promise<void>;
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (card: ICard) => Promise<void>;
}

function Card({ card, handleCreate, handleUpdate, handleDelete }: ICardProps) {
  const [values, setValues] = useState(card);
  const [errors, setErrors] = useState<ICardError[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateFields = () => {
    let updatedErrors = [...errors];

    if (!values.titulo) {
      updatedErrors = [
        ...updatedErrors,
        { field: "titulo", msg: `O título é obrigatório` },
      ];
    }
    if (!values.conteudo) {
      updatedErrors = [
        ...updatedErrors,
        { field: "conteudo", msg: `O conteúdo é obrigatório` },
      ];
    }
    setErrors(updatedErrors);
  };

  const sanitizeFields = () => {
    const sanitizedValues = {
      ...values,
      titulo: DomPurify.sanitize(values.titulo.trim()),
      conteudo: DomPurify.sanitize(values.conteudo.trim()),
    };
    setValues(sanitizedValues);
    return sanitizedValues;
  };

  const createCard = async () => {
    setErrors([]);
    validateFields();
    const values = sanitizeFields();

    if (values.titulo && values.conteudo) {
      try {
        await handleCreate({
          ...values,
          lista: Lista.ToDo,
        });
        console.log("createCard", values);
        setValues({ id: "", titulo: "", conteudo: "", lista: Lista.New });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLeftNav = () => {
    let hidden = false;
    if (values.lista === Lista.ToDo) {
      hidden = true;
    }
    return hidden;
  };

  const handleRightNav = () => {
    let hidden = false;
    if (values.lista === Lista.Done) {
      hidden = true;
    }
    return hidden;
  };

  const moveRight = () => {
    let updated: ICard = { ...values };
    switch (values.lista) {
      default:
      case Lista.ToDo:
        updated = { ...values, lista: Lista.Doing };
        break;
      case Lista.Doing:
        updated = { ...values, lista: Lista.Done };
        break;
    }
    setValues(updated);
    handleUpdate(updated);
  };

  const moveLeft = () => {
    let updated: ICard = { ...values };
    switch (values.lista) {
      default:
      case Lista.Doing:
        updated = { ...values, lista: Lista.ToDo };
        break;
      case Lista.Done:
        updated = { ...values, lista: Lista.Doing };
        break;
    }
    setValues(updated);
    handleUpdate(updated);
  };

  const handleCancel = () => {
    setValues(card);
    setIsEditing(false);
  };

  const handleSave = () => {
    handleUpdate(values);
    setIsEditing(false);
  };

  return (
    <CardContainer>
      {!values.id || isEditing ? (
        <CardForm>
          <TextInput
            name="titulo"
            type="text"
            placeholder="Título"
            value={values.titulo}
            onChange={onChange}
            errors={errors}
          />
          <textarea
            name="conteudo"
            placeholder="Conteúdo"
            onChange={onChange}
            value={values.conteudo}
          />
          {!values.id ? (
            <IconContainer onClick={createCard} title="Adicionar">
              <FaPlusCircle />
            </IconContainer>
          ) : (
            <CardFooter>
              <IconContainer onClick={handleCancel} title="Cancelar">
                <FaBan />
              </IconContainer>
              <IconContainer onClick={handleSave} title="Salvar">
                <FaSave />
              </IconContainer>
            </CardFooter>
          )}
        </CardForm>
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
            <IconContainer
              hidden={handleLeftNav()}
              onClick={moveLeft}
              title="Mover p/ Esquerda"
            >
              <FaChevronCircleLeft />
            </IconContainer>
            <IconContainer onClick={() => handleDelete(values)} title="Excluir">
              <FaTrashAlt />
            </IconContainer>
            <IconContainer
              hidden={handleRightNav()}
              onClick={moveRight}
              title="Mover p/ Direita"
            >
              <FaChevronCircleRight />
            </IconContainer>
          </CardFooter>
        </>
      )}
    </CardContainer>
  );
}

export default Card;
