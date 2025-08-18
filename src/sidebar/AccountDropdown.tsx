import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "../store/auth";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false); // 🔑 модалка
  const [isRegister, setIsRegister] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, register, login, logout } = useAuthStore();

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ----------------- Логика формы -----------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let ok = false;

    if (isRegister) {
      ok = register({ name, email, password });
      if (!ok) setError("Пользователь с таким email уже существует!");
    } else {
      ok = login(email, password);
      if (!ok) setError("Неверный email или пароль!");
    }

    if (ok) {
      setShowAuth(false);
      setName("");
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex u-container items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-100 transition"
      >
        <div className="user-image__container w-10 h-10 bg-gray-200 rounded-full overflow-hidden"></div>
        <div className="user-name font-medium text-sm">
          {user ? user.name : "Гость"}
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 w-full bg-white shadow-lg rounded-xl z-50 overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col text-sm">
              <button className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                Настройки
              </button>
              {user ? (
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" /> Выйти
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                >
                  <LogIn className="w-4 h-4" /> Войти / Регистрация
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Login/Register */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-lg w-96 p-6"
            >
              <h2 className="text-lg font-semibold mb-4">
                {isRegister ? "Регистрация" : "Вход"}
              </h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {isRegister && (
                  <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2"
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                  {isRegister ? "Зарегистрироваться" : "Войти"}
                </button>
              </form>
              <p
                className="mt-3 text-sm text-gray-500 cursor-pointer hover:underline"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister
                  ? "Уже есть аккаунт? Войти"
                  : "Нет аккаунта? Зарегистрироваться"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;
