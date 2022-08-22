import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { FaBan, FaPlusCircle, FaSave } from "react-icons/fa";
import { ICard, Lista } from "../../types/card.type";
import { CardFooter, CardForm, IconContainer } from "./Card.styles";
import { TextInput } from "./TextInput";
import { ContentInput } from "./ContentInput";

interface CardFormProps {
  card: ICard;
  handleCreate: (card: ICard) => Promise<void>;
  handleUpdate: (card: ICard) => Promise<void>;
  setEditing: (edit: boolean) => void;
}

function CardEdit({
  card,
  handleCreate,
  handleUpdate,
  setEditing,
}: CardFormProps) {
  const [title, setTitle] = useState<string>(card.titulo || "");
  const [content, setContent] = useState<string>(card.conteudo || "");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");

  const validateFields = (): ICard | null => {
    const vTitle = DOMPurify.sanitize(title.trim());
    const vContent = DOMPurify.sanitize(content.trim());
    let valid: ICard | null = {
      id: card.id,
      titulo: vTitle,
      conteudo: vContent,
      lista: card.lista,
    };

    setTitleError("");
    setContentError("");

    if (!vTitle) {
      setTitleError("O título é obrigatório");
      valid = null;
    }
    if (!vContent) {
      setContentError("O conteúdo é obrigatório");
      valid = null;
    }

    return valid;
  };

  const createCard = async () => {
    const vCard = validateFields();

    if (vCard) {
      try {
        await handleCreate({
          ...vCard,
          lista: Lista.ToDo,
        });

        setTitle("");
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveCard = async () => {
    const vCard = validateFields();

    if (vCard) {
      try {
        await handleUpdate(vCard);
        setEditing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  // useEffect(() => {
  //   console.count("CardEdit useEffect");
  // }, []);

  return (
    <CardForm>
      <TextInput
        name="titulo"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        error={titleError}
      />
      <ContentInput
        name="conteudo"
        height="40vh"
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        error={contentError}
      />
      {!card.id ? (
        <IconContainer onClick={createCard} title="Adicionar">
          <FaPlusCircle />
        </IconContainer>
      ) : (
        <CardFooter>
          <IconContainer onClick={cancelEdit} title="Cancelar">
            <FaBan />
          </IconContainer>
          <IconContainer onClick={saveCard} title="Salvar">
            <FaSave />
          </IconContainer>
        </CardFooter>
      )}
    </CardForm>
  );
}

export default CardEdit;
