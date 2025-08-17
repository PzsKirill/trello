import React from 'react';
import type { Task } from './types';

export default function TaskCard({ task, onEdit, onDelete }: { task: Task; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 leading-snug">{task.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={onEdit} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">✏️</button>
          <button onClick={onDelete} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">🗑️</button>
        </div>
      </div>
    </div>
  );
}