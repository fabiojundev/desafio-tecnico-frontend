import axios from "axios";
import DOMPurify from "dompurify";
import { ICard } from "../types/card.type";

const API_URL = "http://0.0.0.0:5000";

const getToken = () => {
  const token = localStorage.getItem("auth.token");
  return token;
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const login = async () => {
  const usuario = "letscode";
  const senha = "lets@123";
  const response = await axios.post(`${API_URL}/login`, {
    login: usuario,
    senha,
  });

  if (response?.data) {
    localStorage.setItem("auth.token", response.data);
  }
};

export const logout = () => {
  localStorage.removeItem("auth.token");
};

const request = async (path: string, options?: any) => {
  let ret;
  const url = DOMPurify.sanitize(`${API_URL}${path}`);

  if (!isLoggedIn()) {
    await login();
  }
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${getToken()}`,
  };

  try {
    ret = await axios({
      ...options,
      url,
      headers,
    });
  } catch (error) {
    // reset login jwt token
    localStorage.setItem("auth.token", "");
  }
  return ret;
};

export const getCards = async (): Promise<ICard[] | undefined> => {
  let ret;
  const response = await request("/cards");
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};

export const createCard = async (card: ICard): Promise<ICard | undefined> => {
  let ret;
  const options = {
    method: "POST",
    data: card,
  };

  const response = await request("/cards", options);
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};

export const updateCard = async (card: ICard): Promise<ICard | undefined> => {
  let ret;
  const options = {
    method: "PUT",
    data: card,
  };

  const response = await request(`/cards/${card.id}`, options);
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};

export const deleteCard = async (card: ICard): Promise<ICard | undefined> => {
  let ret;
  const options = {
    method: "DELETE",
  };

  const response = await request(`/cards/${card.id}`, options);
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};
