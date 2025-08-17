import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../kanban-board/Modal';
import UserEditor from './UserEditor';
import type { User, UserRole } from './types';

const LS_KEY = 'users_v1';

type Mode = 'add' | 'edit' | 'delete' | null;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const [mode, setMode] = useState<Mode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  // загрузка из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as User[];
        setUsers(parsed);
      }
    } catch (err) {
      console.error('Не удалось прочитать пользователей из localStorage', err);
    }
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Не удалось сохранить пользователей в localStorage', err);
    }
  }, [users]);

  // фильтрация/поиск
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone || '').toLowerCase().includes(q) ||
        (u.position || '').toLowerCase().includes(q);

      const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, search, roleFilter]);

  // модалки
  const openAdd = () => {
    setActiveUser({
      id: uuidv4(),
      name: '',
      email: '',
      phone: '',
      role: 'employee',
      position: '',
    });
    setMode('add');
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setActiveUser({ ...user });
    setMode('edit');
    setModalOpen(true);
  };

  const openDelete = (user: User) => {
    setActiveUser(user);
    setMode('delete');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMode(null);
    setActiveUser(null);
  };

  // сохранение
  const handleSave = (user: User) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user];
    });
    closeModal();
  };

  const handleDelete = () => {
    if (!activeUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== activeUser.id));
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            className="border rounded px-3 py-2 w-full md:w-80"
            placeholder="Поиск (имя, email, телефон, должность)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
          >
            <option value="all">Все роли</option>
            <option value="employee">Сотрудник</option>
            <option value="admin">Администратор</option>
          </select>
        </div>

        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Добавить сотрудника
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-[800px] w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm text-gray-600">Имя</th>
              <th className="px-4 py-3 text-sm text-gray-600">Email</th>
              <th className="px-4 py-3 text-sm text-gray-600">Телефон</th>
              <th className="px-4 py-3 text-sm text-gray-600">Роль</th>
              <th className="px-4 py-3 text-sm text-gray-600">Должность</th>
              <th className="px-4 py-3 text-sm text-gray-600 w-40">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Нет сотрудников
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.phone || '—'}</td>
                  <td className="px-4 py-3">
                    {u.role === 'admin' ? (
                      <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs">
                        Администратор
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">
                        Сотрудник
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{u.position || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 text-sm rounded border hover:bg-gray-50"
                        onClick={() => openEdit(u)}
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        className="px-3 py-1 text-sm rounded border bg-red-50 text-red-700 hover:bg-red-100"
                        onClick={() => openDelete(u)}
                      >
                        🗑️ Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          mode === 'add'
            ? 'Новый сотрудник'
            : mode === 'edit'
            ? 'Редактировать сотрудника'
            : mode === 'delete'
            ? 'Удаление сотрудника'
            : ''
        }
      >
        {(mode === 'add' || mode === 'edit') && activeUser && (
          <UserEditor initial={activeUser} onCancel={closeModal} onSave={handleSave} />
        )}

        {mode === 'delete' && activeUser && (
          <div className="space-y-4">
            <p>
              Удалить сотрудника <b>{activeUser.name || activeUser.email}</b>?
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={closeModal} className="px-3 py-2 border rounded">
                Отмена
              </button>
              <button onClick={handleDelete} className="px-3 py-2 bg-red-600 text-white rounded">
                Удалить
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
