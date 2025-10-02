import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

const themeColors = {
  light: {
    primary: "#66BB6A",
    background: "#F7F9FC",
    card: "#FFFFFF",
    text: "#1C1C1E",
    textSecondary: "#8E8E93",
    border: "#E0E0E0",
    danger: "#D32F2F",
    white: "#FFFFFF",
    black: "#121212",
    status_ok: "#D4EDDA",
    status_danger: "#F8D7DA",
  },
  dark: {
    primary: "#388E3C",
    background: "#121212",
    card: "#2C2C2E",
    text: "#EAEAEA",
    textSecondary: "#8E8E93",
    border: "#272727",
    danger: "#D32F2F",
    white: "#FFFFFF",
    black: "#121212",
    status_ok: "#1A3D25",
    status_danger: "#4F1B1F",
  },
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    colors: themeColors[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
