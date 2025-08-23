import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "../store/auth";
import AuthModal from "./AuthModal";
import SettingsModal from "./SettingsModal";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); // переместили сюда
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuthStore();

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-100 transition"
      >
        <div className="user-image__container w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
          {user ? (
            <img src={user.avatar} alt="avatar" className="object-cover w-full h-full" />
          ) : null}
        </div>
        <div className="user-name font-medium text-sm">
          {user ? user.name : "Гость"}
        </div>
      </button>

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
              {user ? (
                <>
                  <button
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <Settings className="w-4 h-4" />
                    Настройки
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                >
                  <LogIn className="w-4 h-4" />
                  Войти
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default AccountDropdown;
