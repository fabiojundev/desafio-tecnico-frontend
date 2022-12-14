import { useEffect, useState } from "react";
import {
  FaEdit,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaTrashAlt,
} from "react-icons/fa";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlight from "highlight.js";
import { ICard, Lista } from "../../types/card.type";

import {
  CardBody,
  CardContainer,
  CardFooter,
  CardHeader,
  CardTitle,
  CardView as SCardView,
  IconContainer,
} from "./Card.styles";

import "highlight.js/styles/github.css";

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

interface CardViewProps {
  card: ICard;
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setEditing: (edit: boolean) => void;
}

function CardView({
  card,
  handleUpdate,
  handleDelete,
  setEditing,
}: CardViewProps) {
  const [isLeftNavDisabled, setLeftNavDisabled] = useState(false);
  const [isRightNavDisabled, setRighttNavDisabled] = useState(false);

  const updateList = (lista: Lista) => {
    handleUpdate({
      ...card,
      lista,
    });
  };

  const moveRight = () => {
    switch (card.lista) {
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
    switch (card.lista) {
      case Lista.Done:
        updateList(Lista.Doing);
        break;

      case Lista.Doing:
      default:
        updateList(Lista.ToDo);
        break;
    }
  };

  useEffect(() => {
    const manageLeftNav = () => {
      let disabled = false;
      if (Lista.ToDo === card.lista) {
        disabled = true;
      }

      setLeftNavDisabled(disabled);
    };

    const manageRightNav = () => {
      let disabled = false;
      if (Lista.Done === card.lista) {
        disabled = true;
      }

      setRighttNavDisabled(disabled);
    };

    manageLeftNav();
    manageRightNav();
  }, [card.lista]);

  const deleteCard = () => {
    if (card.id) {
      handleDelete(card.id);
    }
  };

  return (
    <CardContainer>
      <SCardView>
        <CardHeader>
          <CardTitle title="T??tulo">{card.titulo}</CardTitle>
          <IconContainer onClick={() => setEditing(true)}>
            <FaEdit title="Editar" />
          </IconContainer>
        </CardHeader>
        <CardBody
          title="Conte??do"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(card.conteudo)),
          }}
        />
        <CardFooter>
          <IconContainer
            disabled={isLeftNavDisabled}
            onClick={moveLeft}
            title="Mover p/ Esquerda"
          >
            <FaChevronCircleLeft />
          </IconContainer>
          <IconContainer onClick={deleteCard} title="Excluir">
            <FaTrashAlt />
          </IconContainer>
          <IconContainer
            disabled={isRightNavDisabled}
            onClick={moveRight}
            title="Mover p/ Direita"
          >
            <FaChevronCircleRight />
          </IconContainer>
        </CardFooter>
      </SCardView>
    </CardContainer>
  );
}

export default CardView;
