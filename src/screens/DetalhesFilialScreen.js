import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";
import { useTranslation } from "react-i18next";

export default function DetalhesFilialScreen({ route, navigation }) {
  const { filialId } = route.params;
  const [filial, setFilial] = useState(null);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const carregarDetalhes = async () => {
    if (!filialId) return;
    setLoading(true);
    try {
      const response = await apiJava.get(`/filial/${filialId}`);
      setFilial(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da filial:", error);
      Alert.alert(t("alertError"), t("errorLoadingFilialDetail"));
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDetalhes();
    }, [filialId])
  );

  const handleDelete = () => {
    Alert.alert(
      t("confirmDeleteTitle"),
      t("confirmDeleteMessageFilial", { nome: filial.nome }),
      [
        { text: t("cancelButton", "Cancelar"), style: "cancel" },
        {
          text: t("deleteButton"),
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await apiJava.delete(`/filial/${filial.id}`);
              Alert.alert(t("alertSuccess"), t("alertSuccessFilialDeleted"));
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao apagar filial:", error);
              Alert.alert(t("alertError"), t("alertErrorFilialDeleted"));
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading || !filial) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{filial.nome}</Text>
      <View style={styles.detailsCard}>
        {/* 3. TRADUZA OS LABELS */}
        <Text style={styles.detailItem}>
          {t("labelEndereco")}: {filial.endereco}
        </Text>
        <Text style={styles.detailItem}>
          {t("labelCidade")}: {filial.cidade}
        </Text>
        <Text style={styles.detailItem}>
          {t("labelUF")}: {filial.siglaEstado}
        </Text>
        <Text style={styles.detailItem}>
          {t("labelCapacidade")}: {filial.capacidadeMaxima} motos
        </Text>
        <Text style={styles.detailItem}>
          {t("titlePatio")}: {filial.numeroLinha} x {filial.numeroColuna}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t("editButton")}
          onPress={() =>
            navigation.navigate("EditarFilial", { filial: filial })
          }
          color={colors.primary}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t("deleteButton")}
          onPress={handleDelete}
          color={colors.danger}
        />
      </View>
    </ScrollView>
  );
}

// A função de estilos não muda
const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.text,
    },
    detailsCard: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 2,
    },
    detailItem: { fontSize: 18, marginBottom: 10, color: colors.text },
    buttonContainer: { marginVertical: 10 },
  });
