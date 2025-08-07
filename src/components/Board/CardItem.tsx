import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Card } from "../../types/Card";

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const openCard = () => {
    navigate(`/project/${projectId}/card/${card.id}`);
  };

  return (
    <div
      onClick={openCard}
      style={{
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
        minWidth: "200px",
        background: "#f9f9f9",
      }}
    >
      <strong>{card.title}</strong>
    </div>
  );
};

export default CardItem;
