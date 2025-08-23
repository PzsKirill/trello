import Sidebar from "./sidebar/sidebar";
import KanbanBoard from "./components/kanban-board/KanbanBoard";
import GlobalBackground from "./background/GlobalBackground";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <KanbanBoard />
      <GlobalBackground />
    </div>
  );
};

export default App;
