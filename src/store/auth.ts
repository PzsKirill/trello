import { create } from "zustand";

interface User {
  name: string;
  email: string;
  password: string; // 🔑 добавили пароль
}

interface AuthState {
  user: User | null;
  register: (user: User) => boolean; // вернём true/false
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("auth_user") || "null"),

  register: (newUser) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Проверка: есть ли уже пользователь с таким email
    if (users.some((u) => u.email === newUser.email)) {
      return false; // ❌ email занят
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("auth_user", JSON.stringify(newUser));

    set({ user: newUser });
    return true; // ✅ зарегистрирован
  },

  login: (email, password) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const existing = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existing) {
      return false; // ❌ неправильные данные
    }

    localStorage.setItem("auth_user", JSON.stringify(existing));
    set({ user: existing });
    return true; // ✅ вошёл
  },

  logout: () => {
    localStorage.removeItem("auth_user");
    set({ user: null });
  },
}));
