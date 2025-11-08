import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { apiJava } from "../services/api";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function PatioVisualizacaoScreen({ route, navigation }) {
  const { filialId, filialNome } = route.params;

  const [patioData, setPatioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: filialNome || "Layout do Pátio" });
  }, [navigation, filialNome]);

  const carregarPatio = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiJava.get(`/filial/${filialId}/posicoes`);
      setPatioData(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do pátio:", err);
      setError(t("errorLoadingPatio"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filialId) {
      carregarPatio();
    }
  }, [filialId]);

  const vagasOcupadas = patioData.filter((v) => v.ocupado).length;
  const totalVagas = patioData.length;

  const renderVaga = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.vaga,
        item.ocupado ? styles.vagaOcupada : styles.vagaLivre,
      ]}
      onPress={() =>
        item.ocupado &&
        item.moto &&
        navigation.navigate("DetalhesMoto", { motoId: item.moto.id })
      }
    >
      {item.ocupado && <Text style={styles.vagaIcon}>🏍️</Text>}
      <Text style={styles.vagaText}>{item.identificacao}</Text>
      {item.ocupado && item.moto && (
        <Text style={styles.vagaMotoText}>{item.moto.placa}</Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{t("patioOccupancy")}: </Text>
          <Text style={styles.statsValue}>
            {vagasOcupadas} / {totalVagas}
          </Text>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: colors.status_ok },
              ]}
            />
            <Text style={styles.legendText}>{t("legendFree")}</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: colors.status_danger },
              ]}
            />
            <Text style={styles.legendText}>{t("legendOccupied")}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={patioData}
        renderItem={renderVaga}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t("emptyVagas")}</Text>
        }
        refreshing={loading}
        onRefresh={carregarPatio}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    errorText: { color: colors.danger, fontSize: 16 },
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
    },

    header: {
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    statsContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "center",
      marginBottom: 10,
    },
    statsText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    statsValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    legendContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    legendColorBox: {
      width: 14,
      height: 14,
      borderRadius: 4,
      marginRight: 8,
    },
    legendText: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    vaga: {
      flex: 1,
      margin: 4,
      paddingVertical: 10,
      minHeight: 80,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
    },
    vagaLivre: {
      backgroundColor: colors.status_ok,
    },
    vagaOcupada: {
      backgroundColor: colors.status_danger,
    },
    vagaIcon: {
      fontSize: 24,
    },
    vagaText: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    vagaMotoText: {
      fontSize: 10,
      marginTop: 4,
      color: colors.text,
      fontWeight: "500",
    },
  });
