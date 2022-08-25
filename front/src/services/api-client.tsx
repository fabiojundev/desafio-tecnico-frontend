import axios, { AxiosResponse, AxiosError } from "axios";
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
  // const usuario = process.env.REACT_APP_API_USER;
  // const senha = process.env.REACT_APP_API_KEY;
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

const request = async (
  path: string,
  options?: any,
  retryCount: number = 1,
): Promise<AxiosResponse | undefined> => {
  let ret: AxiosResponse | undefined;
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
    /* eslint-disable no-console */
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 404:
          console.log("Bad request");
          break;

        case 401:
        default:
          console.log("Unauthorized");
          // reset login jwt token
          localStorage.setItem("auth.token", "");

          // retry again recursively for max 3 times
          if (retryCount < 3) {
            return await request(path, options, 1 + retryCount);
          }
      }
    }
    console.log("API access error", error);
    throw(error);
    /* eslint-enable */
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

  console.log("bf");
  const response = await request(`/cards/${card.id}`, options);
  console.log("af", response);
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};

export const deleteCard = async (id: string): Promise<ICard[] | undefined> => {
  let ret;
  const options = {
    method: "DELETE",
  };

  const response = await request(`/cards/${id}`, options);
  if (response?.data) {
    ret = response.data;
  }
  return ret;
};
