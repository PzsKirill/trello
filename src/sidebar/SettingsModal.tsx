import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "Просто человек");
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);

  useEffect(() => {
    setName(user?.name || "");
    setRole(user?.role || "Просто человек");
    setPreview(user?.avatar || null);
  }, [user]);

  if (!isOpen || !user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name,
      role,
      avatar: preview || user.avatar,
    };
    updateUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Настройки аккаунта</h2>
        <div className="flex flex-col gap-3">
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <div>
            Должность:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option>Разработчик</option>
              <option>Дизайнер</option>
              <option>Маркетолог</option>
              <option>Директор</option>
              <option>Просто человек</option>
            </select>
          </div>

          <div>
            Аватар:
            <div className="flex items-center gap-3 mt-2">
              {preview && (
                <img
                  src={preview}
                  alt="avatar preview"
                  className="w-16 h-16 rounded-full object-cover border"
                />
              )}
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
            Отмена
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-500 text-white">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
