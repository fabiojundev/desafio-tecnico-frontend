import React, { useEffect, useReducer } from "react";
import {
  initialState,
  retrieveCardsAction,
  startRequestAction,
  setErrorAction,
  boardReducer,
  BoardContext,
  // BoardState,
} from "../../state";

import { TopBar } from "../TopBar";
import { ICard, Lista } from "../../types/card.type";
import { Card } from "../Card";
import {
  BoardContainer,
  ListContainer,
  ListHeader,
  ListTitle,
} from "./Board.styles";

interface IBoardProps {
  createCard(card: ICard): Promise<ICard | undefined>;
  getCards(): Promise<ICard[] | undefined>;
  updateCard(card: ICard): Promise<ICard | undefined>;
  deleteCard(id: string): Promise<ICard[] | undefined>;
}
function Board({ createCard, getCards, updateCard, deleteCard }: IBoardProps) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const { cards, loading, error } = state;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(startRequestAction());
    const getAllCards = async () => {
      try {
        const response = await getCards();

        if (response) {
          dispatch(retrieveCardsAction(response));
        }
      } catch (error) {
        if (typeof error?.message === 'string') {
          dispatch(setErrorAction(error.message));
        }
      }
    };

    getAllCards();
  }, []);
  /* eslint-enable */

  const getListCards = (list: string): ICard[] => {
    return cards?.filter((c: ICard) => c.lista === list);
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
    <BoardContext.Provider value={{ state, dispatch }}>
      <BoardContainer>
        <TopBar loading={loading} msg={error} />
        <ListContainer>
          <ListHeader>
            <ListTitle>Novo</ListTitle>
          </ListHeader>
          <Card
            card={newCard}
            createCard={createCard}
            updateCard={updateCard}
            deleteCard={deleteCard}
          />
        </ListContainer>
        {lists.map((list) => (
          <ListContainer key={list.id} title={list.label}>
            <ListHeader>
              <ListTitle>{list.label}</ListTitle>
            </ListHeader>
            {getListCards(list.id).map((card: ICard) => (
              <Card
                key={card.id}
                card={card}
                createCard={createCard}
                updateCard={updateCard}
                deleteCard={deleteCard}
              />
            ))}
          </ListContainer>
        ))}
      </BoardContainer>
    </BoardContext.Provider>
  );
}

export default Board;
