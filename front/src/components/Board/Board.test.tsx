import { render, screen, cleanup } from "@testing-library/react";
import Board from "./Board";
import { Card } from "../Card";
import { ICard, Lista } from "../../types/card.type";

const card: ICard = {
  titulo: "Titulo",
  conteudo: "Conteudo",
  lista: Lista.ToDo,
};

afterEach(cleanup);
