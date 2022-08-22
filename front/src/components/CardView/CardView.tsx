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
} from "./CardView.styles";

import "highlight.js/styles/github.css";

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
});

interface CardViewProps extends ICard {
  handleUpdate: (card: ICard) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setEditing: (edit: boolean) => void;
}

function CardView({
  id,
  titulo,
  conteudo,
  lista,
  handleUpdate,
  handleDelete,
  setEditing,
}: CardViewProps) {
  const [isLeftNavDisabled, setLeftNavDisabled] = useState(false);
  const [isRightNavDisabled, setRighttNavDisabled] = useState(false);

  const manageLeftNav = (lista: Lista): boolean => {
    let disabled = false;
    if (lista === Lista.ToDo) {
      disabled = true;
    }

    setLeftNavDisabled(disabled);
    return disabled;
  };

  const manageRightNav = (lista: Lista): boolean => {
    let disabled = false;
    if (lista === Lista.Done) {
      disabled = true;
    }

    setRighttNavDisabled(disabled);
    return disabled;
  };

  const updateList = (lista: Lista) => {
    const updated = {
      id,
      titulo,
      conteudo,
      lista,
    };

    manageLeftNav(lista);
    manageRightNav(lista);
    handleUpdate(updated);
  };

  const moveRight = () => {
    switch (lista) {
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
    switch (lista) {
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
    manageLeftNav(lista);
    manageRightNav(lista);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardContainer>
      <SCardView>
        <CardHeader>
          <CardTitle title="Título">{titulo}</CardTitle>
          <IconContainer onClick={() => setEditing(true)}>
            <FaEdit title="Editar" />
          </IconContainer>
        </CardHeader>
        <CardBody
          title="Conteúdo"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(conteudo)),
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
          <IconContainer onClick={() => handleDelete(id)} title="Excluir">
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
