import { useContext } from "react";
import { BoardContext } from "../../state";
import { ICard, Lista } from "../../types/card.type";
import { Card } from "../Card";
import {
  BoardContainer,
  ListContainer,
  ListHeader,
  ListTitle,
} from "./Board.styles";

function Board() {
  const { state } = useContext(BoardContext);
  const { cards } = state;

  const getListCards = (list: string) => {
    return cards?.filter((c) => c.lista === list);
  };

  const newCard: ICard = {
    titulo: "",
    conteudo: "",
    lista: Lista.New,
  };

  const lists = [
    { id: "ToDo", label: "To Do" },
    { id: "Doing", label: "Doing" },
    { id: "Done", label: "Done" },
  ];

  return (
    <BoardContainer>
      <ListContainer>
        <ListHeader>
          <ListTitle>Novo</ListTitle>
        </ListHeader>
        <Card card={newCard} />
      </ListContainer>
      {lists.map((list) => (
        <ListContainer key={list.id} title={list.label}>
          <ListHeader>
            <ListTitle>{list.label}</ListTitle>
          </ListHeader>
          {getListCards(list.id).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </ListContainer>
      ))}
    </BoardContainer>
  );
}

export default Board;
