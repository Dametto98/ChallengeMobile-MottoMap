import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";
import { useTranslation } from "react-i18next";

const ProblemaCard = ({ item, colors, onEdit, onDelete }) => {
  const styles = getStyles(colors);
  const { t } = useTranslation();

  const translateTipoProblema = (tipo) => {
    switch (tipo) {
      case "MECANICO":
        return t("problemTypeMechanical");
      case "ELETRICO":
        return t("problemTypeElectrical");
      case "CARROCERIA":
        return t("problemTypeBodywork");
      case "SEGURANCA":
        return t("problemTypeSecurity");
      case "LEGAL":
        return t("problemTypeLegal");
      case "OUTRO":
        return t("problemTypeOther");
      default:
        return tipo;
    }
  };

  const translateStatus = (resolvido) => {
    return resolvido
      ? t("problemStatusResolved", "Resolvido")
      : t("problemStatusPending", "Pendente");
  };

  return (
    <View style={styles.problemaCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.problemaTipo}>
          {translateTipoProblema(item.tipoProblema)}
        </Text>
        <Text style={styles.problemaDescricao}>{item.descricao}</Text>
        <Text style={styles.problemaData}>
          {t("labelReportedOn", "Reportado em:")} {item.dataRegistro}
        </Text>
        <Text style={styles.problemaStatus(item.resolvido)}>
          {translateStatus(item.resolvido)}
        </Text>
      </View>
      <View style={styles.problemaActions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>
            {t("editButton")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Text style={[styles.actionButtonText, { color: colors.danger }]}>
            {t("deleteButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ProblemasListScreen({ route, navigation }) {
  const { motoId, motoPlaca } = route.params;
  const [problemas, setProblemas] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${t("labelProblemasList")} - ${motoPlaca}`,
    });
  }, [navigation, motoPlaca, t]);

  const carregarProblemas = async () => {
    setLoading(true);
    try {
      const response = await apiJava.get(`/moto/${motoId}/problemas`);
      setProblemas(response.data);
    } catch (error) {
      Alert.alert(t("alertError"), t("errorLoadingProblems"));
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarProblemas();
    }, [motoId])
  );

  const handleDeleteProblema = (problemaId) => {
    Alert.alert(
      t("confirmDeleteProblemaTitle"),
      t("confirmDeleteProblemaMessage"),
      [
        { text: t("cancelButton"), style: "cancel" },
        {
          text: t("deleteButton"),
          style: "destructive",
          onPress: async () => {
            try {
              await apiJava.delete(`/problema/${problemaId}`);
              Alert.alert(t("alertSuccess"), t("alertSuccessProblemaDeleted"));
              carregarProblemas();
            } catch (error) {
              Alert.alert(t("alertError"), t("alertErrorProblemaDeleted"));
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Button
          title={t("reportProblemButton")}
          onPress={() =>
            navigation.navigate("RegistrarProblema", { motoId: motoId })
          }
          color={colors.primary}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          style={styles.container}
          data={problemas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProblemaCard
              item={item}
              colors={colors}
              onDelete={() => handleDeleteProblema(item.id)}
              onEdit={() =>
                navigation.navigate("EditarProblema", {
                  problema: item,
                  motoId: motoId,
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyProblemas}>{t("emptyProblemas")}</Text>
          }
          contentContainerStyle={styles.flatListContent}
          onRefresh={carregarProblemas}
          refreshing={loading}
        />
      )}
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
    flatListContent: {
      padding: 20,
      paddingTop: 10,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
    },
    emptyProblemas: {
      textAlign: "center",
      color: colors.textSecondary,
      padding: 20,
      fontSize: 16,
    },
    problemaCard: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    problemaTipo: {
      fontSize: 17,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
      textTransform: "capitalize",
    },
    problemaDescricao: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 6,
      flexWrap: "wrap",
    },
    problemaData: {
      fontSize: 12,
      color: colors.textSecondary,
      fontStyle: "italic",
      marginBottom: 4,
    },
    problemaStatus: (resolvido) => ({
      fontSize: 13,
      fontWeight: "bold",
      color: resolvido ? colors.primary : colors.danger,
      textTransform: "uppercase",
      alignSelf: "flex-start",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 5,
      backgroundColor: resolvido ? colors.status_ok : colors.status_danger,
      overflow: "hidden",
    }),
    problemaActions: {
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-around",
    },
    actionButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });
