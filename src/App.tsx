import Sidebar from "./sidebar/sidebar";
// import Column from "./components/kanban-board/Column";
// import { type Column as ColumnType, type Task } from "./components/kanban-board/types";
import KanbanBoard from "./components/kanban-board/KanbanBoard";

// const mockColumn: ColumnType = {
//   id: "col-1",
//   title: "Пример колонки",
//   tasks: []
// };

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      {/* <Column
        col={mockColumn}
        onAddTask={() => console.log("Добавить задачу")}
        onEditTask={(task: Task) => console.log("Редактировать задачу", task)}
        onDeleteTask={(taskId: string) => console.log("Удалить задачу", taskId)}
        onEditColumn={() => console.log("Редактировать колонку")}
        onRemoveColumn={() => console.log("Удалить колонку")}
      /> */}

       <KanbanBoard />
    </div>
  );
};

export default App;
