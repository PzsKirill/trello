import { useEffect } from "react";
import { useSettingsStore } from "../store/settings";

const GlobalBackground = () => {
  const { backgroundImage, theme, fontSize, accentColor } = useSettingsStore();

  useEffect(() => {
    document.body.style.backgroundImage = backgroundImage ? `url(${backgroundImage})` : "";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";

    document.body.dataset.theme = theme;
    document.body.dataset.fontSize = fontSize;
    if (accentColor) {
      document.body.style.setProperty("--accent-color", accentColor);
    }
  }, [backgroundImage, theme, fontSize, accentColor]);

  return null;
};

export default GlobalBackground;
