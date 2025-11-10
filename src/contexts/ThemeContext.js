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
    secondary: '#FFA000',
    status_ok: '#D4EDDA',
    status_danger: '#F8D7DA',
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
    secondary: '#FFC107',
    status_ok: '#1A3D25',
    status_danger: '#4F1B1F',
  },
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  let initialColorScheme = "light";
  try {
    const colorScheme = Appearance.getColorScheme();
    initialColorScheme = colorScheme || "light";
  } catch (error) {
    console.warn('[ThemeContext] Erro ao obter colorScheme:', error);
  }
  
  const [theme, setTheme] = useState(initialColorScheme);

  useEffect(() => {
    let subscription;
    try {
      subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(colorScheme || "light");
      });
    } catch (error) {
      console.warn('[ThemeContext] Erro ao adicionar listener:', error);
    }
    
    return () => {
      if (subscription && subscription.remove) {
        try {
          subscription.remove();
        } catch (error) {
          console.warn('[ThemeContext] Erro ao remover listener:', error);
        }
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Garante que sempre temos um tema válido
  const safeTheme = theme === "dark" ? "dark" : "light";
  
  const value = {
    theme: safeTheme,
    toggleTheme,
    colors: themeColors[safeTheme] || themeColors.light,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
