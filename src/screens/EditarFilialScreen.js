import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";
import { useTranslation } from "react-i18next";

export default function EditarFilialScreen({ route, navigation }) {
  const { filial } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const [nome, setNome] = useState(filial.nome);
  const [endereco, setEndereco] = useState(filial.endereco);
  const [cidade, setCidade] = useState(filial.cidade);
  const [siglaEstado, setSiglaEstado] = useState(filial.siglaEstado);
  const [numeroLinha, setNumeroLinha] = useState(String(filial.numeroLinha));
  const [numeroColuna, setNumeroColuna] = useState(String(filial.numeroColuna));
  const [capacidadeMaxima, setCapacidadeMaxima] = useState(
    String(filial.capacidadeMaxima)
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = t("errorRequired");
    if (!siglaEstado || siglaEstado.length !== 2)
      newErrors.siglaEstado = t("errorUFLength");
    if (!numeroLinha || isNaN(numeroLinha))
      newErrors.numeroLinha = t("errorLinesInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setLoading(true);
    const filialData = {
      nome,
      endereco,
      cidade,
      siglaEstado: siglaEstado.toUpperCase(),
      numeroLinha: parseInt(numeroLinha),
      numeroColuna: parseInt(numeroColuna),
      capacidadeMaxima: parseInt(capacidadeMaxima),
    };

    try {
      await apiJava.put(`/filial/${filial.id}`, filialData);
      Alert.alert(t("alertSuccess"), t("alertSuccessFilialUpdated"));
      navigation.navigate("Filiais");
    } catch (error) {
      console.error("Erro ao atualizar filial:", error.response?.data || error);
      Alert.alert(t("alertError"), t("alertErrorFilialUpdated"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>{t("labelNomeFilial")}</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholderTextColor={colors.textSecondary}
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <Text style={styles.label}>{t("labelEndereco")}</Text>
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>{t("labelCidade")}</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>{t("labelUF")}</Text>
      <TextInput
        style={styles.input}
        value={siglaEstado}
        onChangeText={setSiglaEstado}
        maxLength={2}
        autoCapitalize="characters"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.siglaEstado && (
        <Text style={styles.errorText}>{errors.siglaEstado}</Text>
      )}

      <Text style={styles.label}>{t("labelLinhas")}</Text>
      <TextInput
        style={styles.input}
        value={numeroLinha}
        onChangeText={setNumeroLinha}
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.numeroLinha && (
        <Text style={styles.errorText}>{errors.numeroLinha}</Text>
      )}

      <Text style={styles.label}>{t("labelColunas")}</Text>
      <TextInput
        style={styles.input}
        value={numeroColuna}
        onChangeText={setNumeroColuna}
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>{t("labelCapacidade")}</Text>
      <TextInput
        style={styles.input}
        value={capacidadeMaxima}
        onChangeText={setCapacidadeMaxima}
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title={t("updateButton")}
            onPress={handleUpdate}
            color={colors.primary}
          />
        </View>
      )}
    </ScrollView>
  );
}

// A função de estilos não muda
const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    label: { fontSize: 16, color: colors.text, marginBottom: 5, marginTop: 10 },
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    errorText: { color: colors.danger, fontSize: 12, marginTop: 5 },
    buttonContainer: { marginTop: 30, marginBottom: 20 },
  });
