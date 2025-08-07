import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../../types/Task";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const { cardId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Карточка ID: {cardId}</h3>
      <button onClick={() => setIsModalOpen(true)}>+ Добавить задачу</button>

      <div style={{ marginTop: "15px" }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleComplete} />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal onClose={() => setIsModalOpen(false)} onCreate={addTask} />
      )}
    </div>
  );
};

export default TaskList;
