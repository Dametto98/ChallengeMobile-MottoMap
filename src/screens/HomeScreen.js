import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggleButton from "../components/ThemeToggleButton";
export default function HomeScreen({ navigation }) {
  const { signOut, user } = useAuth();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const welcomeMessage = "Bem-vindo(a)!";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{welcomeMessage}</Text>
          <Text style={styles.subtitle}>Selecione uma opção para começar</Text>
          <ThemeToggleButton />
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("MotosList")}
          >
            <Text style={styles.menuButtonText}>🏍️ Gerenciar Motos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("Filiais")}
          >
            <Text style={styles.menuButtonText}>🏢 Nossas Filiais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutButtonContainer}>
          <Button title="Sair do App" color={colors.danger} onPress={signOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 8,
      marginBottom: 10,
    },
    menuContainer: {
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: "center",
    },
    menuButton: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      marginVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuButtonText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    logoutButtonContainer: {
      padding: 20,
    },
  });
