import Sidebar from "./sidebar/sidebar";
import KanbanBoard from "./components/kanban-board/KanbanBoard";


const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <KanbanBoard />
    </div>
  );
};

export default App;
