// src/store/auth.ts
import { create } from "zustand";
import CryptoJS from "crypto-js";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  passwordHash: string; // пароль в хешированном виде
  role: string;         // должность
  createdAt: string;    // дата регистрации
}

interface AuthState {
  user: User | null;
  users: User[];
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Загружаем данные из localStorage при инициализации
  user: JSON.parse(localStorage.getItem("currentUser") || "null"),
  users: JSON.parse(localStorage.getItem("users") || "[]"),

  register: (name, email, password) => {
    const users = get().users;

    if (users.find(u => u.email === email)) {
      alert("Пользователь с таким email уже существует!");
      return false;
    }

    const passwordHash = CryptoJS.SHA256(password).toString();

    const avatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      name
    )}`;

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      avatar,
      passwordHash,
      role: "Просто человек",          // дефолтная должность
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    set({ users: updatedUsers, user: newUser });
    return true;
  },

  login: (email, password) => {
    const users = get().users;
    const passwordHash = CryptoJS.SHA256(password).toString();

    const existingUser = users.find(
      u => u.email === email && u.passwordHash === passwordHash
    );

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      set({ user: existingUser });
      return true;
    } else {
      alert("Неверный email или пароль");
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("currentUser");
    set({ user: null });
  },

  updateUser: (updatedUser) => {
    const users = get().users.map(u =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    set({ users, user: updatedUser });
  },
}));
