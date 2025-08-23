import React from "react";
import ReactDOM from "react-dom/client";
import Settings from "./components/setting/Settings";
import Sidebar from "./sidebar/sidebar";
import GlobalBackground from "./background/GlobalBackground";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalBackground />
    <div className="app-container">
      <Sidebar />
      <Settings />
    </div>
  </React.StrictMode>
);
