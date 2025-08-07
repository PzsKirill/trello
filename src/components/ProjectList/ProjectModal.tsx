import React, { useState } from "react";
import type { Project } from "../../types/Project";

interface ProjectModalProps {
  onClose: () => void;
  onCreate: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = () => {
    if (!projectName.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
    };

    onCreate(newProject);
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
        <h3>Создать проект</h3>
        <input
          type="text"
          placeholder="Название проекта"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            Отмена
          </button>
          <button onClick={handleSubmit}>Создать</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
