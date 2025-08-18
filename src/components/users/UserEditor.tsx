import { useState } from 'react';
import type * as types from './types';

export default function UserEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: types.User;
  onCancel: () => void;
  onSave: (user: types.User) => void;
}) {
  const [form, setForm] = useState<types.User>({ ...initial });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Укажите имя';
    if (!form.email.trim()) next.email = 'Укажите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Некорректный email';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange<K extends keyof types.User>(key: K, value: types.User[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Имя и фамилия</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Иван Иванов"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="name@company.com"
          type="email"
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Телефон</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={form.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+48 123 456 789"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Роль</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.role}
            onChange={(e) => handleChange('role', e.target.value as types.UserRole)}
          >
            <option value="employee">Сотрудник</option>
            <option value="admin">Администратор</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Должность</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={form.position || ''}
            onChange={(e) => handleChange('position', e.target.value)}
            placeholder="Frontend разработчик"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <button onClick={onCancel} className="px-3 py-2 border rounded">Отмена</button>
        <button
          onClick={() => {
            if (!validate()) return;
            onSave(form);
          }}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}