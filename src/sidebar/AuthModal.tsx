// src/sidebar/AuthModal.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { register, login } = useAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      const success = register(name, email, password);
      if (success) {
        onClose();
      }
    } else {
      const success = login(email, password);
      if (success) {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {isRegister ? "Регистрация" : "Вход"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
              >
                {isRegister ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
              {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-500 hover:underline"
              >
                {isRegister ? "Войти" : "Регистрация"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
