import React, { useEffect, useContext } from "react";
import { newCard, BoardContext } from "../../state";

import { TopBar } from "../TopBar";
import { ICard, Lista } from "../../types/card.type";
import { Card } from "../Card";
import {
  BoardContainer,
  ListContainer,
  ListHeader,
  ListTitle,
} from "./Board.styles";

function Board() {
  const { state, retrieveCardsApi } = useContext(BoardContext);
  const { cards, loading, error } = state;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    retrieveCardsApi();
  }, []);
  /* eslint-enable */

  const getListCards = (list: string): ICard[] => {
    return cards?.filter((c: ICard) => c.lista === list);
  };

  const lists = [
    { id: Lista.ToDo, label: "To Do" },
    { id: Lista.Doing, label: "Doing" },
    { id: Lista.Done, label: "Done" },
  ];

  return (
    <BoardContainer>
      <TopBar loading={loading} msg={error} />
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
          {getListCards(list.id).map((card: ICard) => (
            <Card key={card.id} card={card} />
          ))}
        </ListContainer>
      ))}
    </BoardContainer>
  );
}

export default Board;
