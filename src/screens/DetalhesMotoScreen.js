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

export default function DetalhesMotoScreen({ route, navigation }) {
  const { motoId } = route.params;
  const [moto, setMoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  const carregarDetalhes = async () => {
    setLoading(true);
    try {
      const response = await apiJava.get(`/moto/${motoId}`);
      setMoto(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da moto:", error);
      Alert.alert(t("alertError"), t("errorLoadingMotoDetail"));
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDetalhes();
    }, [motoId])
  );

  const handleDelete = async () => {
    Alert.alert(
      t("confirmDeleteTitle"),
      t("confirmDeleteMessageMoto", { placa: moto.placa }),
      [
        { text: t("cancelButton", "Cancelar"), style: "cancel" },
        {
          text: t("deleteButton"),
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await apiJava.delete(`/moto/${moto.id}`);
              Alert.alert(t("alertSuccess"), t("alertSuccessMotoDeleted"));
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao apagar moto:", error);
              Alert.alert(t("alertError"), t("alertErrorMotoDeleted"));
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading || !moto) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("titleDetalhesMoto")}</Text>
      <View style={styles.detailsCard}>
        <Text style={styles.detailItem}>
          {t("motoPlaca")}: {moto.placa}
        </Text>
        <Text style={styles.detailItem}>
          {t("motoChassi")}: {moto.chassi}
        </Text>
        <Text style={styles.detailItem}>
          {t("motoModelo")}: {moto.modeloMoto}
        </Text>
        <Text style={styles.detailItem}>
          {t("motoAno")}: {moto.ano}
        </Text>
        <Text style={styles.detailItem}>
          {t("motoStatus")}: {moto.statusMoto}
        </Text>
        <Text style={styles.detailItem}>
          {t("motoFilial")}: {moto.filial.nome}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t("editButton")}
          onPress={() => navigation.navigate("EditarMoto", { moto: moto })}
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
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.text,
    },
    detailsCard: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    detailItem: { fontSize: 18, marginBottom: 10, color: colors.text },
    buttonContainer: { marginVertical: 10 },
  });
