import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { type Column as ColumnType, type Task } from './types';
import TaskCard from './TaskCard';

export default function Column({
  col,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditColumn,
  onRemoveColumn
}: {
  col: ColumnType;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditColumn: () => void;
  onRemoveColumn: () => void;
}) {
  return (
    <div className="trello-card">
      {/* Заголовок колонки */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg">{col.title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={onAddTask} className="text-sm px-2 py-1 border rounded">
            + Задача
          </button>
          <button onClick={onEditColumn} className="text-sm px-2 py-1 border rounded">
            ✏️
          </button>
          <button onClick={onRemoveColumn} className="text-sm px-2 py-1 border rounded">
            🗑️
          </button>
        </div>
      </div>

      {/* Список задач */}
      <Droppable droppableId={col.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[60px] space-y-3 transition-all ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {col.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(providedDr) => (
                  <div
                    ref={providedDr.innerRef}
                    {...providedDr.draggableProps}
                    {...providedDr.dragHandleProps}
                    className="border p-3 rounded bg-white shadow-sm"
                  >
                    {/* Карточка задачи */}
                    <TaskCard
                      task={task}
                      onEdit={() => onEditTask(task)}
                      onDelete={() => onDeleteTask(task.id)}
                    />

                    {/* Дедлайн */}
                    {task.deadline && (
                      <p className="text-sm text-gray-500 mt-1">📅 {task.deadline}</p>
                    )}

                    {/* Приоритет */}
                    {task.priority && (
                      <p
                        className={`text-sm mt-1 ${
                          task.priority === 'high'
                            ? 'text-red-600'
                            : task.priority === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        Приоритет: {task.priority}
                      </p>
                    )}

                    {/* Теги */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Категория */}
                    {task.category && (
                      <p className="text-xs mt-1 text-purple-600">
                        📂 Категория: {task.category}
                      </p>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
