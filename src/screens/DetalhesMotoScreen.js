import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
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
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const carregarDetalhes = async () => {
    setLoading(true);
    try {
      const responseMoto = await apiJava.get(`/moto/${motoId}`);
      setMoto(responseMoto.data);
    } catch (error) {
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

  const handleDeleteMoto = async () => {
    Alert.alert(
      t("confirmDeleteTitle"),
      t("confirmDeleteMessageMoto", { placa: moto.placa }),
      [
        { text: t("cancelButton"), style: "cancel" },
        {
          text: t("deleteButton"),
          style: "destructive",
          onPress: async () => {
            try {
              await apiJava.delete(`/moto/${motoId}`);
              Alert.alert(t("alertSuccess"), t("alertSuccessMotoDeleted"));
              navigation.goBack();
            } catch (error) {
              Alert.alert(t("alertError"), t("alertErrorMotoDeleted"));
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>{t("titleDetalhesMoto")}</Text>

        <View style={styles.detailsCard}>
          <Text style={styles.detailItem}>
            {t("labelPlaca")}: {moto.placa}
          </Text>
          <Text style={styles.detailItem}>
            {t("labelChassi")}: {moto.chassi}
          </Text>
          <Text style={styles.detailItem}>
            {t("labelModelo")}: {moto.modeloMoto}
          </Text>
          <Text style={styles.detailItem}>
            {t("labelAno")}: {moto.ano}
          </Text>
          <Text style={styles.detailItem}>
            {t("labelStatus")}: {moto.statusMoto}
          </Text>
          <Text style={styles.detailItem}>
            {t("labelFilial")}: {moto.filial?.nome || t("notAvailable", "N/D")}
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
            onPress={handleDeleteMoto}
            color={colors.danger}
          />
        </View>

        <View style={styles.buttonContainerProblema}>
          <Button
            title={t("labelProblemasList", "Histórico de Problemas")}
            onPress={() =>
              navigation.navigate("ProblemasList", {
                motoId: moto.id,
                motoPlaca: moto.placa,
              })
            }
            color={colors.secondary}
          />
        </View>
      </ScrollView>
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
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.text,
      marginTop: 10,
    },
    detailsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      borderColor: colors.border,
      borderWidth: 1,
    },
    detailItem: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 8,
      lineHeight: 24,
    },
    buttonContainer: {
      marginVertical: 5,
    },
    buttonContainerProblema: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 20,
    },
  });
