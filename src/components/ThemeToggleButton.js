import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext"; 
import { useTranslation } from 'react-i18next';

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.card, borderColor: colors.primary },
      ]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.primary }]}>
        {theme === "light" ? t('themeToggleDark') : t('themeToggleLight')}
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
