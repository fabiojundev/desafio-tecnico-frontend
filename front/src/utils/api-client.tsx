import axios from "axios";
import DOMPurify from "dompurify";

const API_URL = "http://0.0.0.0:5000";

const getToken = () => {
  const token = localStorage.getItem("auth.token");
  return token;
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const login = async () => {
  if (!isLoggedIn()) {
    const usuario = "letscode";
    const senha = "lets@123";
    const response = await axios.post(`${API_URL}/login`, {
      login: usuario,
      senha,
    });

    if (response.data) {
      localStorage.setItem("auth.token", response.data);
    }
  }
};

export const logout = () => {
  localStorage.removeItem("auth.token");
};

export const request = async (path: string, options?: any) => {
  const url = DOMPurify.sanitize(`${API_URL}${path}`);

  if (!isLoggedIn()) {
    await login();
  }
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${getToken()}`,
  };

  return axios({
    ...options,
    url,
    headers,
  });
};
