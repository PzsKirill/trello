import React, { useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import CardList from "./CardList";
import CardModal from "./CardModal";
import type { Card } from "../../types/Card";
import TaskList from "../Task/TaskList";

const Board: React.FC = () => {
  const { projectId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCard = (card: Card) => {
    setCards([...cards, card]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Проект ID: {projectId}</h2>
      <button onClick={() => setIsModalOpen(true)}>+ Добавить карточку</button>

      <CardList cards={cards} />

      {isModalOpen && (
        <CardModal onClose={() => setIsModalOpen(false)} onCreate={addCard} />
      )}

      {/* Вложенный маршрут для задач карточки */}
      <Routes>
        <Route path="card/:cardId" element={<TaskList />} />
      </Routes>
    </div>
  );
};

export default Board;
