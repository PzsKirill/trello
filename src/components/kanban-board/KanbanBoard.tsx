import React, { useState, useEffect } from "react";
import Column from "./Column";
import { type Column as ColumnType, type Task } from "./types";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Modal from "./Modal";
import TaskEditor from "./TaskEditor";
import "./style/style.css";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [search, setSearch] = useState("");

  // модалки
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "addTask" | "editTask" | "addColumn" | "editColumn" | "deleteColumn" | null
  >(null);
  const [activeColId, setActiveColId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // ====== localStorage ======
  useEffect(() => {
    const saved = localStorage.getItem("kanbanColumns");
    if (saved) {
      setColumns(JSON.parse(saved));
    } else {
      setColumns([
        { id: uuidv4(), title: "Backlog", tasks: [] },
        { id: uuidv4(), title: "In Progress", tasks: [] },
        { id: uuidv4(), title: "Done", tasks: [] },
      ]);
    }
  }, []);

  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem("kanbanColumns", JSON.stringify(columns));
    }
  }, [columns]);

  // ====== drag & drop ======
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    setColumns((prev) => {
      const newCols = [...prev];
      const sourceColIndex = newCols.findIndex((c) => c.id === source.droppableId);
      const destColIndex = newCols.findIndex((c) => c.id === destination.droppableId);
      if (sourceColIndex === -1 || destColIndex === -1) return prev;

      const sourceCol = { ...newCols[sourceColIndex] };
      const destCol = { ...newCols[destColIndex] };

      if (sourceCol.id === destCol.id) {
        const tasks = [...sourceCol.tasks];
        const [moved] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, moved);
        sourceCol.tasks = tasks;
        newCols[sourceColIndex] = sourceCol;
        return newCols;
      }

      const sourceTasks = [...sourceCol.tasks];
      const [moved] = sourceTasks.splice(source.index, 1);
      const destTasks = [...destCol.tasks];
      destTasks.splice(destination.index, 0, moved);

      sourceCol.tasks = sourceTasks;
      destCol.tasks = destTasks;

      newCols[sourceColIndex] = sourceCol;
      newCols[destColIndex] = destCol;
      return newCols;
    });
  };

  // ====== задачи ======
  const openAddTask = (colId: string) => {
    setActiveColId(colId);
    setActiveTask({ id: uuidv4(), title: "", tags: [] }); // создаём только для модалки
    setModalType("addTask");
    setModalOpen(true);
  };

  const openEditTask = (colId: string, task: Task) => {
    setActiveColId(colId);
    setActiveTask(task);
    setModalType("editTask");
    setModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (!activeColId || !task.title.trim()) return;
    setColumns((prev) =>
      prev.map((col) =>
        col.id === activeColId
          ? {
              ...col,
              tasks: col.tasks.some((t) => t.id === task.id)
                ? col.tasks.map((t) => (t.id === task.id ? task : t))
                : [...col.tasks, task],
            }
          : col
      )
    );
    setModalOpen(false);
  };

  const handleDeleteTask = (colId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col
      )
    );
  };

  // ====== колонки ======
  const openAddColumn = () => {
    setModalType("addColumn");
    setModalOpen(true);
  };

  const openEditColumn = (colId: string) => {
    setActiveColId(colId);
    setModalType("editColumn");
    setModalOpen(true);
  };

  const openDeleteColumn = (colId: string) => {
    setActiveColId(colId);
    setModalType("deleteColumn");
    setModalOpen(true);
  };

  const handleSaveColumn = (title: string) => {
    if (modalType === "addColumn") {
      setColumns((prev) => [...prev, { id: uuidv4(), title, tasks: [] }]);
    } else if (modalType === "editColumn" && activeColId) {
      setColumns((prev) => prev.map((c) => (c.id === activeColId ? { ...c, title } : c)));
    }
    setModalOpen(false);
  };

  const handleDeleteColumn = () => {
    if (activeColId) {
      setColumns((prev) => prev.filter((c) => c.id !== activeColId));
    }
    setModalOpen(false);
  };

  // ====== фильтр ======
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    ),
  }));

  return (
    <div className="trello-container p-4">
      <div className="trello-top">
        <input
          type="text"
          placeholder="Поиск по задачам или тегам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full trello-search"
        />
        <button onClick={openAddColumn} className="bg-blue-500 text-white px-4 rounded trello-btn">
          Добавить колонку
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="trello-list overflow-x-auto ">
          {filteredColumns.map((col) => (
            <Column
              key={col.id}
              col={col}
              onAddTask={() => openAddTask(col.id)}
              onEditTask={(task: Task) => openEditTask(col.id, task)}
              onDeleteTask={(taskId: string) => handleDeleteTask(col.id, taskId)}
              onEditColumn={() => openEditColumn(col.id)}
              onRemoveColumn={() => openDeleteColumn(col.id)}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Модалки */}
      <Modal
        isOpen={modalOpen}
        title={
          modalType === "addTask"
            ? "Новая задача"
            : modalType === "editTask"
            ? "Редактировать задачу"
            : modalType === "addColumn"
            ? "Новая колонка"
            : modalType === "editColumn"
            ? "Редактировать колонку"
            : modalType === "deleteColumn"
            ? "Удаление колонки"
            : ""
        }
        onClose={() => setModalOpen(false)}
      >
        {modalType === "addTask" || modalType === "editTask" ? (
          <TaskEditor
            initial={activeTask!}
            onCancel={() => setModalOpen(false)}
            onSave={handleSaveTask}
          />
        ) : null}

        {(modalType === "addColumn" || modalType === "editColumn") && (
          <ColumnEditor
            initialTitle={
              modalType === "editColumn"
                ? columns.find((c) => c.id === activeColId)?.title || ""
                : ""
            }
            onCancel={() => setModalOpen(false)}
            onSave={handleSaveColumn}
          />
        )}

        {modalType === "deleteColumn" && (
          <div className="space-y-4">
            <p>Вы уверены, что хотите удалить колонку?</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setModalOpen(false)} className="px-3 py-2 border rounded">
                Отмена
              </button>
              <button
                onClick={handleDeleteColumn}
                className="px-3 py-2 bg-red-600 text-white rounded"
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ColumnEditor({
  initialTitle,
  onCancel,
  onSave,
}: {
  initialTitle: string;
  onCancel: () => void;
  onSave: (title: string) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  return (
    <div className="space-y-3">
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Название колонки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-3 py-2 border rounded">
          Отмена
        </button>
        <button
          onClick={() => {
            if (title.trim()) onSave(title.trim());
          }}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
