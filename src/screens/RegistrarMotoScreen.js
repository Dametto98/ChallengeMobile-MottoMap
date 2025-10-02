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
import DropDownPicker from "react-native-dropdown-picker";

const modelosMotoItems = [
  { label: "POP_110I", value: "POP_110I" },
  { label: "MOTTU_E_MAX", value: "MOTTU_E_MAX" },
  { label: "MOTTU_SPORT_ESD", value: "MOTTU_SPORT_ESD" },
  { label: "MOTTU_SPORT", value: "MOTTU_SPORT" },
];

export default function RegistrarMotoScreen({ navigation }) {
  const { colors, theme } = useTheme();
  const styles = getStyles(colors);

  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [ano, setAno] = useState("");
  const [statusMoto, setStatusMoto] = useState("ATIVA");
  const [idFilial, setIdFilial] = useState("1");

  const [open, setOpen] = useState(false);
  const [modeloMoto, setModeloMoto] = useState(null);
  const [items, setItems] = useState(modelosMotoItems);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!placa) newErrors.placa = "A placa é obrigatória.";
    if (!chassi || chassi.length !== 17)
      newErrors.chassi = "O chassi deve ter 17 caracteres.";
    if (!modeloMoto) newErrors.modeloMoto = "O modelo é obrigatório.";
    if (!ano || isNaN(ano)) newErrors.ano = "O ano deve ser um número válido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    const motoData = {
      placa,
      chassi,
      modeloMoto,
      ano: parseInt(ano),
      statusMoto,
      filial: parseInt(idFilial),
    };

    try {
      await apiJava.post("/moto", motoData);
      Alert.alert("Sucesso!", "Nova moto registrada.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível registrar a nova moto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <Text style={styles.label}>Placa</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder="Ex: BRA2E19"
        autoCapitalize="characters"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

      <Text style={styles.label}>Chassi</Text>
      <TextInput
        style={styles.input}
        value={chassi}
        onChangeText={setChassi}
        placeholder="17 caracteres"
        maxLength={17}
        placeholderTextColor={colors.textSecondary}
      />
      {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}

      <Text style={styles.label}>Modelo</Text>
      <DropDownPicker
        open={open}
        value={modeloMoto}
        items={items}
        setOpen={setOpen}
        setValue={setModeloMoto}
        setItems={setItems}
        listMode="MODAL"
        theme={theme.toUpperCase()}
        style={styles.dropdown}
        placeholder="Selecione um modelo..."
        placeholderStyle={{ color: colors.textSecondary }}
        dropDownContainerStyle={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        listItemLabelStyle={{ color: colors.text }}
        selectedItemLabelStyle={{ fontWeight: "bold" }}
        zIndex={1000}
      />
      {errors.modeloMoto && (
        <Text style={styles.errorText}>{errors.modeloMoto}</Text>
      )}

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Ex: 2024"
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.ano && <Text style={styles.errorText}>{errors.ano}</Text>}

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar Nova Moto"
            onPress={handleSave}
            color={colors.primary}
          />
        </View>
      )}
    </ScrollView>
  );
}

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
      height: 50,
    },
    errorText: { color: colors.danger, fontSize: 12, marginTop: 5 },
    buttonContainer: { marginTop: 30, marginBottom: 40 },
    dropdown: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      marginBottom: 15,
    },
  });
