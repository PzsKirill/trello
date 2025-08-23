import { create } from "zustand";

interface SettingsState {
  theme: "light" | "dark";
  fontSize: "small" | "normal" | "large";
  backgroundImage: string | null;
  backgrounds: string[];
  sounds: boolean;
  updateSettings: (settings: Partial<SettingsState>) => void;
  addBackground: (image: string) => void;
  removeBackground: (image: string) => void;
}

// Дефолтные картинки (нельзя удалять)
const defaultBackgrounds = [
  "https://img1.akspic.ru/crops/2/6/3/2/7/172362/172362-germaniya-art-soundcloud-zvukovoj_element-spotifaj-7680x4320.jpg",
  "https://img3.akspic.ru/crops/2/9/8/0/7/170892/170892-interesnye_fakty_o_kosta_rike-vulkan_arenal-puteshestvie-priklyucheniya-odinochnoe_puteshestvie-7680x4320.jpg",
  "",
];

// Загружаем сохранённые настройки
const saved = JSON.parse(localStorage.getItem("settings") || "null");

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: saved?.theme || "light",
  fontSize: saved?.fontSize || "normal",
  backgroundImage: saved?.backgroundImage || defaultBackgrounds[0], // фон по умолчанию
  backgrounds: saved?.backgrounds || defaultBackgrounds,
  sounds: saved?.sounds ?? true,

  updateSettings: (settings) => {
    const newState = { ...get(), ...settings };
    set(newState);

    // Сохраняем только данные, без методов
    localStorage.setItem(
      "settings",
      JSON.stringify({
        theme: newState.theme,
        fontSize: newState.fontSize,
        backgroundImage: newState.backgroundImage,
        backgrounds: newState.backgrounds,
        sounds: newState.sounds,
      })
    );
  },

  addBackground: (image) => {
    const newBackgrounds = [...get().backgrounds, image];
    const newState = { ...get(), backgrounds: newBackgrounds, backgroundImage: image };
    set(newState);

    localStorage.setItem(
      "settings",
      JSON.stringify({
        theme: newState.theme,
        fontSize: newState.fontSize,
        backgroundImage: newState.backgroundImage,
        backgrounds: newState.backgrounds,
        sounds: newState.sounds,
      })
    );
  },

  removeBackground: (image) => {
    const { backgrounds, backgroundImage } = get();

    // Не даём удалять дефолтные
    if (defaultBackgrounds.includes(image)) return;

    const newBackgrounds = backgrounds.filter((bg) => bg !== image);

    const newState = {
      ...get(),
      backgrounds: newBackgrounds,
      backgroundImage:
        backgroundImage === image ? defaultBackgrounds[0] : backgroundImage, // ✅ ставим дефолт
    };

    set(newState);

    localStorage.setItem(
      "settings",
      JSON.stringify({
        theme: newState.theme,
        fontSize: newState.fontSize,
        backgroundImage: newState.backgroundImage,
        backgrounds: newState.backgrounds,
        sounds: newState.sounds,
      })
    );
  },
}));
