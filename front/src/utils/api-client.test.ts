import {
  login,
  logout,
  isLoggedIn,
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "./api-client";
import ICard from "../types/card.type";

describe("Make Request", () => {
  it("Verify if user is logged out", () => {
    logout();
    expect(isLoggedIn()).toEqual(false);
  });

  it("Verify Login", async () => {
    await login();
    expect(isLoggedIn()).toEqual(true);
  });
});

describe("Manage Cards", () => {
  it("Verify Login", async () => {
    await login();
    expect(isLoggedIn()).toEqual(true);
  });

  it("Create and Update card", async () => {
    const card: ICard = {
      titulo: "Test Card",
      conteudo: "Test Card Description",
      lista: "ToDo",
    };

    const response = await createCard(card);
    expect(response?.id).not.toEqual("");
    expect(response?.titulo).toEqual(card.titulo);
    expect(response?.conteudo).toEqual(card.conteudo);
    expect(response?.lista).toEqual(card.lista);

    const changedCard: ICard = {
      titulo: "Test Card1",
      conteudo: "Test Card Description1",
      lista: "Done",
    };
    const updatedCard = await updateCard({
      ...response,
      ...changedCard,
    });
    expect(updatedCard?.id).toEqual(response?.id);
    expect(updatedCard?.titulo).toEqual(changedCard.titulo);
    expect(updatedCard?.conteudo).toEqual(changedCard.conteudo);
    expect(updatedCard?.lista).toEqual(changedCard.lista);
  });

  it("Get cards list and delete them", async () => {
    await login();
    const cards = await getCards();
    expect(cards).not.toEqual([]);

    cards?.forEach(async (card: ICard) => {
      expect(card.id).not.toEqual("");
      await deleteCard(card);
    });

    const cards1 = await getCards();
    expect(cards1).toEqual([]);
  });
});
