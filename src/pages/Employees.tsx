import { useState } from "react";
import { useAuthStore } from "../store/auth";
import "../pages/style/personal.css"

const Employees = () => {
  const { users } = useAuthStore();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.role].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="personal-container">
      <h1 className="text-2xl font-bold mb-4">Сотрудники</h1>

      <input
        type="text"
        placeholder="Поиск сотрудника..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="trello-search w-full border p-2 rounded mb-4"
      />

      <table className="table-personal">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Аватар</th>
            <th className="p-2 border">Имя</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Должность</th>
            <th className="p-2 border">Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover mx-auto"
                />
              </td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {new Date(user.createdAt).toLocaleDateString("ru-RU")}
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                Нет сотрудников
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
