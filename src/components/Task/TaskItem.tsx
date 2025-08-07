import React from "react";
import type { Task } from "../../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(task.id)}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "8px",
        background: task.completed ? "#e0ffe0" : "#fff",
        cursor: "pointer",
      }}
    >
      {task.title} {task.completed && "✔"}
    </div>
  );
};

export default TaskItem;
