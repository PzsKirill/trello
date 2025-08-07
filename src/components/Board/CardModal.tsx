import React, { useState } from "react";
import type { Card } from "../../types/Card";

interface CardModalProps {
  onClose: () => void;
  onCreate: (card: Card) => void;
}

const CardModal: React.FC<CardModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;

    const newCard: Card = {
      id: Date.now().toString(),
      title,
    };

    onCreate(newCard);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Создать карточку</h3>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            Отмена
          </button>
          <button onClick={handleCreate}>Создать</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
