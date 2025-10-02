import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";

const StatusBadge = ({ status }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const isAtiva = status === "ATIVA";

  const backgroundColor = isAtiva ? colors.primary : colors.textSecondary;
  const textColor = isAtiva ? colors.white : colors.text;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{status}</Text>
    </View>
  );
};

const MotoCard = ({ item, onPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
        <Text style={styles.cardSubtitle}>
          {item.modeloMoto} - Ano: {item.ano}
        </Text>
      </View>
      <StatusBadge status={item.statusMoto} />
    </TouchableOpacity>
  );
};

export default function MotosListScreen({ navigation }) {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const carregarMotos = async () => {
    setLoading(true);
    try {
      const response = await apiJava.get("/moto?sort=id,desc");
      setMotos(response.data.content || []);
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de motos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && motos.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MotoCard
              item={item}
              onPress={() =>
                navigation.navigate("DetalhesMoto", { motoId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Nenhuma moto registrada ainda.
            </Text>
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          onRefresh={carregarMotos}
          refreshing={loading}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("RegistrarMoto")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    emptyListText: {
      textAlign: "center",
      marginTop: 30,
      color: colors.textSecondary,
      fontSize: 16,
    },
    card: {
      backgroundColor: colors.card,
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    cardSubtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
    badgeText: { fontSize: 12, fontWeight: "bold" },
    fab: {
      position: "absolute",
      bottom: 30,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
    },
    fabText: { fontSize: 30, color: colors.white, lineHeight: 32 },
  });
