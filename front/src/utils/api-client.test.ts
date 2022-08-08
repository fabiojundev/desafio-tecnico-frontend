import { login, logout, isLoggedIn, request } from "./api-client";
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

describe("Create a Card", () => {
  it("Verify Login", async () => {
    await login();
    expect(isLoggedIn()).toEqual(true);
  });

  it("Create new card", async () => {
    const options = {
      method: "POST",
      data: {
        titulo: "Test Card",
        conteudo: "Test Card Description",
        lista: "ToDo",
      },
    };
    const response = await request("/cards", options);
    expect(response?.data?.id).not.toEqual("");
    expect(response?.data?.titulo).toEqual(options.data.titulo);
    expect(response?.data?.conteudo).toEqual(options.data.conteudo);
    expect(response?.data?.lista).toEqual(options.data.lista);
  });

  it("Get cards list", async () => {
    await login();
    const response = await request("/cards");
    expect(response?.data).not.toEqual([]);

    response.data.forEach(async (card: ICard) => {
      expect(card.id).not.toEqual("");
      const options = {
        method: "DELETE",
        data: {
          id: card.id,
        },
      };
      await request(`/cards/${card.id}`, options);
    });

    const resp = await request("/cards");
    expect(resp?.data).toEqual([]);
  });
});
