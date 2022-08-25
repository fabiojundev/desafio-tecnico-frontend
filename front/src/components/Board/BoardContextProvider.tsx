import { useReducer, useMemo } from "react";
import {
  initialState,
  createCardAction,
  retrieveCardsAction,
  updateCardAction,
  deleteCardAction,
  startRequestAction,
  setErrorAction,
  boardReducer,
  BoardContext,
  // BoardState,
} from "../../state";
import {
  createCard,
  updateCard,
  deleteCard,
  getCards,
} from "../../services/api-client";
import { ICard } from "../../types/card.type";

function BoardContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const values = useMemo(() => {
    const reportError = (error: unknown) => {
      if (error instanceof Error) {
        dispatch(setErrorAction(error.message));
      }
      return String(error);
    };

    const retrieveCardsApi = async () => {
      dispatch(startRequestAction());
      try {
        const response = await getCards();

        if (response) {
          dispatch(retrieveCardsAction(response));
        }
      } catch (error) {
        reportError(error);
      }
    };

    const createCardApi = async (aCard: ICard) => {
      dispatch(startRequestAction());

      try {
        const response = await createCard(aCard);

        if (response) {
          dispatch(createCardAction(response));
        }
      } catch (error) {
        reportError(error);
      }
    };

    const updateCardApi = async (aCard: ICard) => {
      dispatch(startRequestAction());

      try {
        const response = await updateCard(aCard);

        if (response) {
          dispatch(updateCardAction(response));
        }
      } catch (error) {
        reportError(error);
      }
    };

    const deleteCardApi = async (id: string) => {
      dispatch(startRequestAction());

      try {
        const response = await deleteCard(id);

        if (response) {
          dispatch(deleteCardAction(id));
        }
      } catch (error) {
        reportError(error);
      }
    };

    return {
      state,
      retrieveCardsApi,
      createCardApi,
      updateCardApi,
      deleteCardApi,
    };
  }, [state]);

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
}

export default BoardContextProvider;
