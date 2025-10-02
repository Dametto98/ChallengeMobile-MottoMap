import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

// Definição das cores para cada tema
const themeColors = {
    light: {
        primary: '#66BB6A',
        background: '#F7F9FC',
        card: '#FFFFFF',
        text: '#1C1C1E',
        textSecondary: '#8E8E93',
        border: '#E0E0E0',
        danger: '#D32F2F',
        white: '#FFFFFF',
        black: '#121212',
        status_ok: '#D4EDDA',       
        status_danger: '#F8D7DA',
    },
    dark: {
        primary: '#388E3C',
        background: '#121212',
        card: '#2C2C2E',
        text: '#EAEAEA',
        textSecondary: '#8E8E93',
        border: '#272727',
        danger: '#D32F2F',
        white: '#FFFFFF',
        black: '#121212',
        status_ok: '#1A3D25',       
        status_danger: '#4F1B1F'
    },
};

// Criando o contexto
const ThemeContext = createContext();

// Hook customizado para acessar o tema
export function useTheme() {
    return useContext(ThemeContext);
}

// Provider que irá envolver toda a aplicação
export default function ThemeProvider({ children }) {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState(colorScheme || 'light');

    useEffect(() => {
        // Escuta por mudanças no tema do dispositivo
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });
        return () => subscription.remove();
    }, []);

    // Função para alternar entre os temas manualmente
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // O valor do provider agora inclui o nome do tema, a função de troca e o objeto de cores
    const value = {
        theme, // 'light' ou 'dark'
        toggleTheme,
        colors: themeColors[theme] // O objeto com as cores do tema ativo
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}