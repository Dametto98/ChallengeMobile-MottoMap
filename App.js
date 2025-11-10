import React from "react";
import { View, Text, StyleSheet } from "react-native";
import "./src/services/i18n";
import { AuthProvider } from "./src/contexts/AuthContext";
import StackNavigator from "./src/routes/stack.routes";
import ThemeProvider from "./src/contexts/ThemeContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[App] Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ocorreu um erro ao iniciar o aplicativo.</Text>
          <Text style={styles.errorDetails}>{this.state.error?.toString()}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  errorDetails: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
