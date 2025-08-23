import { useSettingsStore } from "../../store/settings";
import { useState } from "react";

const Settings = () => {
  const { theme, fontSize, backgroundImage, backgrounds, sounds, updateSettings, addBackground, removeBackground } =
    useSettingsStore();

  const [customBackground, setCustomBackground] = useState("");

  const handleAddBackground = () => {
    if (customBackground.trim()) {
      addBackground(customBackground.trim());
      setCustomBackground("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Настройки сайта</h1>

      {/* Тема */}
      <div className="mb-4">
        <label className="block font-medium">Тема:</label>
        <select
          value={theme}
          onChange={(e) => updateSettings({ theme: e.target.value as "light" | "dark" })}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="light">Светлая ☀️</option>
          <option value="dark">Тёмная 🌙</option>
        </select>
      </div>

      {/* Размер шрифта */}
      <div className="mb-4">
        <label className="block font-medium">Размер шрифта:</label>
        <select
          value={fontSize}
          onChange={(e) => updateSettings({ fontSize: e.target.value as "small" | "normal" | "large" })}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="small">Маленький</option>
          <option value="normal">Обычный</option>
          <option value="large">Большой</option>
        </select>
      </div>

      {/* Фоны */}
      <div className="mb-4">
        <label className="block font-medium">Фон сайта:</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {backgrounds.map((bg) => (
            <div key={bg} className="relative group">
              <img
                src={bg}
                alt="background"
                onClick={() => updateSettings({ backgroundImage: bg })}
                className={`w-full h-24 object-cover rounded cursor-pointer transition ${
                  backgroundImage === bg ? "ring-4 ring-blue-500" : "ring-1 ring-gray-300"
                }`}
              />
              {/* Кнопка удаления */}
              <button
                onClick={() => removeBackground(bg)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Добавить фон */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={customBackground}
            onChange={(e) => setCustomBackground(e.target.value)}
            placeholder="Вставьте URL картинки..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddBackground}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            ➕
          </button>
        </div>
      </div>

      {/* Звуки */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sounds}
            onChange={(e) => updateSettings({ sounds: e.target.checked })}
          />
          Включить звуки интерфейса 🔊
        </label>
      </div>
    </div>
  );
};

export default Settings;
