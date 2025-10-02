import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext"; // Importe do novo contexto

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.card, borderColor: colors.primary },
      ]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.primary }]}>
        {theme === "light" ? "🌙 Ativar Modo Escuro" : "☀️ Ativar Modo Claro"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
