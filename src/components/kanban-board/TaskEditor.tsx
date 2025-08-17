import { useState } from 'react';
import { type Task } from './types';

export default function TaskEditor({
  initial,
  onCancel,
  onSave
}: {
  initial: Task;
  onCancel: () => void;
  onSave: (task: Task) => void;
}) {
  const [task, setTask] = useState<Task>({
    ...initial,
    tags: initial.tags || [],
    category: initial.category || ''
  });

  const [tagInput, setTagInput] = useState('');

  function handleAddTag() {
    const trimmed = tagInput.trim();
    if (trimmed && !task.tags.includes(trimmed)) {
      setTask({ ...task, tags: [...task.tags, trimmed] });
    }
    setTagInput('');
  }

  function handleRemoveTag(tag: string) {
    setTask({ ...task, tags: task.tags.filter(t => t !== tag) });
  }

  return (
    <div className="space-y-3">
      {/* Заголовок */}
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Название задачи"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      {/* Описание */}
      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Описание"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      {/* Дедлайн */}
      <input
        type="date"
        className="w-full border px-3 py-2 rounded"
        value={task.deadline || ''}
        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
      />

      {/* Приоритет */}
      <select
        className="w-full border px-3 py-2 rounded"
        value={task.priority || ''}
        onChange={(e) => setTask({ ...task, priority: e.target.value as Task['priority'] })}
      >
        <option value="">Без приоритета</option>
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      {/* Категория */}
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Категория (например: Работа, Личное)"
        value={task.category || ''}
        onChange={(e) => setTask({ ...task, category: e.target.value })}
      />

      {/* Теги */}
      <div>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Новый тег"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Добавить
          </button>
        </div>

        {/* Список тегов */}
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded cursor-pointer"
              onClick={() => handleRemoveTag(tag)}
              title="Нажмите, чтобы удалить тег"
            >
              #{tag} ✖
            </span>
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-2 justify-end">
        <button
          className="px-3 py-2 border rounded"
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          className="px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => onSave(task)}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
