import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ICard from "../types/card.type";

interface ICardProps {
  card: ICard;
  isNew?: boolean;
  handleCreate: (card: ICard) => void;
  handleUpdate: (card: ICard) => void;
  handleDelete: (card: ICard) => void;
}

function Card({
  card,
  isNew,
  handleCreate,
  handleUpdate,
  handleDelete,
}: ICardProps) {
  const [values, setValues] = useState(card);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createCard = () => {
    handleCreate({
      ...values,
      lista: "ToDo",
    });
  };

  return (
    <form>
      {isNew || isEditing ? (
        <>
          <input
            name="titulo"
            type="text"
            placeholder="Título"
            value={values.titulo}
            onChange={onChange}
          />
          <input
            name="conteudo"
            type="textarea"
            placeholder="Conteúdo"
            value={values.conteudo}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <h3>{values.titulo}</h3>
          <FiEdit onClick={ () => setIsEditing(true)} />
          <p>{values.conteudo}</p>
        </>
      )}
      {!isNew ? (
        isEditing ? (
          <input
            name="lista"
            type="text"
            placeholder="Lista"
            value={values.lista}
            onChange={onChange}
          />
        ) : (
          <p>{values.lista}</p>
        )
      ) : (
        <button type="button" onClick={createCard}>
          +
        </button>
      )}
    </form>
  );
}

export default Card;
