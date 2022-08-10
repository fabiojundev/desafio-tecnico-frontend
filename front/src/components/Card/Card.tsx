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
import DOMPurify from "dompurify";
import { marked } from "marked";
import Modal from "react-bootstrap/Modal";
import highlight from "highlight.js";
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

import "bootstrap/dist/css/bootstrap.min.css";
import TextInput from "../TextInput/TextInput";
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
    const values = validateFields();

    if (values.titulo && values.conteudo) {
      try {
        await handleCreate({
          ...values,
          lista: Lista.ToDo,
        });
        console.log("createCard", values);
        setValues({ id: "", titulo: "", conteudo: "", lista: Lista.New });
        setErrors([]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setValues(card);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const values = validateFields();

    if (values.titulo && values.conteudo) {
      try {
        await handleUpdate(values);
        console.log("handleSave", values);
        setErrors([]);
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLeftNav = () => {
    let disabled = false;
    if (values.lista === Lista.ToDo) {
      disabled = true;
    }
    return disabled;
  };

  const handleRightNav = () => {
    let disabled = false;
    if (values.lista === Lista.Done) {
      disabled = true;
    }
    return disabled;
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

  return (
    <CardContainer>
      {!values.id ? ( // Create Card
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
            placeholder="Conteúdo"
            onChange={onChange}
            value={values.conteudo}
            errors={errors}
          />
          <IconContainer onClick={createCard} title="Adicionar">
            <FaPlusCircle />
          </IconContainer>
        </CardForm>
      ) : isEditing ? ( // Edit Card
        <Modal show={isEditing}>
          <Modal.Header closeButton onClick={handleCancel}>
            Editar
          </Modal.Header>
          <Modal.Body>
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
                placeholder="Conteúdo"
                onChange={onChange}
                value={values.conteudo}
                height="25em"
                errors={errors}
              />
              <CardFooter>
                <IconContainer onClick={handleCancel} title="Cancelar">
                  <FaBan />
                </IconContainer>
                <IconContainer onClick={handleSave} title="Salvar">
                  <FaSave />
                </IconContainer>
              </CardFooter>
            </CardForm>
          </Modal.Body>
        </Modal>
      ) : (
        // Show Card
        <>
          <CardHeader>
            <CardTitle title="Título">{values.titulo}</CardTitle>
            <IconContainer onClick={() => setIsEditing(true)}>
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
              disabled={handleLeftNav()}
              onClick={moveLeft}
              title="Mover p/ Esquerda"
            >
              <FaChevronCircleLeft />
            </IconContainer>
            <IconContainer onClick={() => handleDelete(values)} title="Excluir">
              <FaTrashAlt />
            </IconContainer>
            <IconContainer
              disabled={handleRightNav()}
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
