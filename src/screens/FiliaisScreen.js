import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";
import { useTranslation } from "react-i18next";

export default function FiliaisScreen({ navigation }) {
  const [filiais, setFiliais] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const carregarFiliais = async () => {
    setLoading(true);
    try {
      const response = await apiJava.get("/filial");
      setFiliais(response.data.content || []);
    } catch (error) {
      Alert.alert(t("alertError"), t("errorLoadingFiliais"));
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarFiliais();
    }, [])
  );

  const handleDelete = (filialId, filialNome) => {
    Alert.alert(
      t("confirmDeleteTitle"),
      t("confirmDeleteMessageFilial", { nome: filialNome }),
      [
        { text: t("cancelButton", "Cancelar"), style: "cancel" },
        {
          text: t("deleteButton"),
          style: "destructive",
          onPress: async () => {
            try {
              await apiJava.delete(`/filial/${filialId}`);
              Alert.alert(t("alertSuccess"), t("alertSuccessFilialDeleted"));
              carregarFiliais();
            } catch (error) {
              Alert.alert(t("alertError"), t("alertErrorFilialDeleted"));
            }
          },
        },
      ]
    );
  };

  const renderFilialItem = ({ item }) => (
    <View style={styles.filialItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PatioVisualizacao", {
            filialId: item.id,
            filialNome: item.nome,
          })
        }
      >
        <Text style={styles.filialNome}>{item.nome}</Text>
        <Text style={styles.filialEndereco}>
          {item.cidade}, {item.siglaEstado}
        </Text>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("EditarFilial", { filial: item })}
        >
          {/* 3. TRADUZA OS BOTÕES */}
          <Text style={styles.actionButtonText}>{t("editButton")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id, item.nome)}
        >
          {/* 3. TRADUZA OS BOTÕES */}
          <Text style={styles.actionButtonText}>{t("deleteButton")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title={t("titleRegisterFilial")}
          color={colors.primary}
          onPress={() => navigation.navigate("RegistrarFilial")}
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
          data={filiais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFilialItem}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>{t("emptyVagas")}</Text>
          }
          contentContainerStyle={{ paddingHorizontal: 16 }}
          onRefresh={carregarFiliais}
          refreshing={loading}
        />
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filialItem: {
      backgroundColor: colors.card,
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    filialNome: { fontSize: 18, fontWeight: "bold", color: colors.text },
    filialEndereco: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 5,
      marginBottom: 16,
    },
    emptyListText: {
      textAlign: "center",
      marginTop: 50,
      color: colors.textSecondary,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 16,
    },
    actionButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginLeft: 10,
    },
    editButton: {
      backgroundColor: colors.primary,
    },
    deleteButton: {
      backgroundColor: colors.danger,
    },
    actionButtonText: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 14,
    },
  });
