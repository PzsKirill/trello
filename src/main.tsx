import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Sidebar from "./sidebar/sidebar";
import Board from "./components/Board/Board";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <Board />
      </div>
    </BrowserRouter>
  </StrictMode>
);
