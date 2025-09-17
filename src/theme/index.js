import { useColorScheme } from 'react-native';

// Paleta de cores base
const palette = {
  primary: '#4CAF50', // Verde principal
  secondary: '#FFC107', // Amarelo
  danger: '#F44336', // Vermelho
  white: '#FFFFFF',
  black: '#000000',
  grey: '#9E9E9E',
};

// Tema claro
const lightTheme = {
  background: '#F5F5F5', // Fundo bem claro
  card: '#FFFFFF', // Cor de cards e inputs
  text: '#212121', // Texto principal
  textSecondary: '#757575', // Texto secundário
  border: '#E0E0E0', // Cor das bordas
  ...palette,
};

// Tema escuro
const darkTheme = {
  background: '#121212', // Fundo escuro
  card: '#1E1E1E', // Cor de cards e inputs
  text: '#FFFFFF', // Texto principal
  textSecondary: '#BDBDBD', // Texto secundário
  border: '#424242', // Cor das bordas
  ...palette,
};

// Hook customizado para usar o tema facilmente nos componentes
export const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};