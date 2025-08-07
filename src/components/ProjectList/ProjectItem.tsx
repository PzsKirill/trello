import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/Project";

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Link to={`/project/${project.id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {project.name}
        </div>
      </Link>
    </div>
  );
};

export default ProjectItem;
