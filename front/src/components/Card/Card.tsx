import React, { useEffect, useState } from "react";
import {
  FaBan,
  FaEdit,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaPlusCircle,
  FaSave,
  FaTrashAlt,
} from "react-icons/fa";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlight from "highlight.js";
import { ICard, Lista, ICardError } from "../../types/card.type";
import {
  CardBody,
  CardContainer,
  CardFooter,
  CardForm,
  CardHeader,
  CardTitle,
  CardView,
  IconContainer,
} from "./Card.styles";

import { TextInput } from "../TextInput";
import { ContentInput } from "../ContentInput";

import "highlight.js/styles/github.css";

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});
interface ICardProps {
  card: ICard;
  handleCreate: (card: ICard) => Promise<void>;
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (card: ICard) => Promise<void>;
}
interface ICardExt extends ICard {
  leftNavDisabled?: boolean;
  rightNavDisabled?: boolean;
}

function Card({ card, handleCreate, handleUpdate, handleDelete }: ICardProps) {
  const [values, setValues] = useState<ICardExt>(card);
  const [errors, setErrors] = useState<ICardError[]>([]);
  const [isEditing, setEditing] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sanitizeFields = () => {
    const sanitizedValues = {
      ...values,
      titulo: DOMPurify.sanitize(values.titulo.trim()),
      conteudo: DOMPurify.sanitize(values.conteudo.trim()),
    };
    setValues(sanitizedValues);
    return sanitizedValues;
  };

  const validateFields = () => {
    setErrors([]);
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
    return sanitizeFields();
  };

  const createCard = async () => {
    const validatedValues = validateFields();

    if (validatedValues.titulo && validatedValues.conteudo) {
      try {
        await handleCreate({
          ...validatedValues,
          lista: Lista.ToDo,
        });

        setValues({ id: "", titulo: "", conteudo: "", lista: Lista.New });
        setErrors([]);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setValues(card);
    setEditing(false);
  };

  const handleSave = async () => {
    const validatedValues = validateFields();

    if (validatedValues.titulo && validatedValues.conteudo) {
      try {
        await handleUpdate(validatedValues);

        setErrors([]);
        setEditing(false);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const updateList = (lista: Lista) => {
    const updated = {
      ...values,
      lista: lista,
      leftNavDisabled: manageLeftNav(lista),
      rightNavDisabled: manageRightNav(lista)
    };

    setValues(updated);
    handleUpdate(updated);
  };

  const moveRight = () => {
    switch (values.lista) {
      case Lista.ToDo:
        updateList(Lista.Doing);
        break;

      case Lista.Doing:
      default:
        updateList(Lista.Done);
        break;
    }
  };

  const moveLeft = () => {
    switch (values.lista) {
      case Lista.Done:
        updateList(Lista.Doing);
        break;

      case Lista.Doing:
      default:
        updateList(Lista.ToDo);
        break;
    }
  };

  const manageLeftNav = (lista: Lista): boolean => {
    let disabled = false;
    if (lista === Lista.ToDo) {
      disabled = true;
    }
    return disabled;
  };

  const manageRightNav = (lista: Lista): boolean => {
    let disabled = false;
    if (lista === Lista.Done) {
      disabled = true;
    }
    return disabled;
  };

  useEffect(() => {
    updateList(values.lista);
  } , [values.lista]);

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
          <ContentInput
            name="conteudo"
            height={isEditing ? "40vh" : "5em"}
            placeholder="Conteúdo"
            onChange={onChange}
            value={values.conteudo}
            errors={errors}
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
        // Show Card
        <CardView>
          <CardHeader>
            <CardTitle title="Título">{values.titulo}</CardTitle>
            <IconContainer onClick={() => setEditing(true)}>
              <FaEdit title="Editar" />
            </IconContainer>
          </CardHeader>
          <CardBody
            title="Conteúdo"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(values.conteudo)),
            }}
          />
          <CardFooter>
            <IconContainer
              disabled={values.leftNavDisabled}
              onClick={moveLeft}
              title="Mover p/ Esquerda"
            >
              <FaChevronCircleLeft />
            </IconContainer>
            <IconContainer onClick={() => handleDelete(values)} title="Excluir">
              <FaTrashAlt />
            </IconContainer>
            <IconContainer
              disabled={values.rightNavDisabled}
              onClick={moveRight}
              title="Mover p/ Direita"
            >
              <FaChevronCircleRight />
            </IconContainer>
          </CardFooter>
        </CardView>
      )}
    </CardContainer>
  );
}

export default Card;
