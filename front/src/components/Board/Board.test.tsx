import { render, screen, cleanup } from "@testing-library/react";
import Board from "./Board";
import { Card } from "../Card";
import ICard from "../../types/card.type";

const card: ICard = {
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: "ToDo",
};

afterEach(cleanup);
