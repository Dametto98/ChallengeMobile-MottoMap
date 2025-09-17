import './src/i18n';
import { AuthProvider } from "./src/contexts/AuthContext";
import StackNavigator from "./src/routes/stack.routes";

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}