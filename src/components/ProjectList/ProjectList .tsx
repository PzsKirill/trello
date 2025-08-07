import React, { useState } from "react";
import ProjectItem from "./ProjectItem";
import ProjectModal from "./ProjectModal";
import type { Project } from "../../types/Project";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мои проекты</h1>
      <button onClick={() => setIsModalOpen(true)}>+ Добавить проект</button>

      <div style={{ marginTop: "20px" }}>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreate={addProject}
        />
      )}
    </div>
  );
};

export default ProjectList;