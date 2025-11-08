import "./src/services/i18n";
import { AuthProvider } from "./src/contexts/AuthContext";
import StackNavigator from "./src/routes/stack.routes";
import ThemeProvider from "./src/contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
