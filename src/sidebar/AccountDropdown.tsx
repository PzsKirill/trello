// components/AccountDropdown.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogIn, LogOut } from "lucide-react";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = true; // Подключи логику позже

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
        <button onClick={() => setOpen((prev) => !prev)} className="flex u-container items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-100 transition">
            <div className="user-image__container w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {/* <img src="" alt="avatar" className="object-cover w-full h-full" /> */}
            </div>
            <div className="user-name font-medium text-sm">Kirill Przps</div>
        </button>

        <AnimatePresence>
            {open && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 left-0 w-full bg-white shadow-lg rounded-xl z-50 overflow-hidden border border-gray-100">
                <div className="flex flex-col text-sm">
                <button className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100">
                    <Settings className="w-4 h-4" />
                    Настройки
                </button>
                <button className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100">
                    {isLoggedIn ? (
                    <>
                        <LogOut className="w-4 h-4" />
                        Выйти
                    </>
                    ) : (
                    <>
                        <LogIn className="w-4 h-4" />
                        Войти
                    </>
                    )}
                </button>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;
