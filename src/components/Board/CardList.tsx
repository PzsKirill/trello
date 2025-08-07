import React from "react";
import CardItem from "./CardItem";
import type { Card } from "../../types/Card";

interface CardListProps {
  cards: Card[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
