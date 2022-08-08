import ICard from "../types/card.type";

function Card({
  card,
  setCard,
}: {
  card: ICard;
  setCard: (card: ICard) => ICard;
}) {
  return (
    <div className="Card">
      <input
        type="text"
        placeholder="Título"
        value={card.titulo}
        onChange={(e) => setCard({ ...card, titulo: e.target.value })}
      />
      <input
        type="textarea"
        placeholder="Conteúdo"
        value={card.conteudo}
        onChange={(e) => setCard({ ...card, conteudo: e.target.value })}
      />
      {card.lista && (
        <input
          type="text"
          placeholder="Lista"
          value={card.lista}
          onChange={(e) => setCard({ ...card, conteudo: e.target.value })}
        />
      )}
    </div>
  );
}

export default Card;
