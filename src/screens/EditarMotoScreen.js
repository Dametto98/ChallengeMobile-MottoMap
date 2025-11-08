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
  Switch,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { apiJava } from "../services/api";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next"; // 1. IMPORTE O HOOK

const modelosMotoItems = [
  { label: "POP_110I", value: "POP_110I" },
  { label: "MOTTU_E_MAX", value: "MOTTU_E_MAX" },
  { label: "MOTTU_SPORT_ESD", value: "MOTTU_SPORT_ESD" },
  { label: "MOTTU_SPORT", value: "MOTTU_SPORT" },
];

export default function EditarMotoScreen({ route, navigation }) {
  const { moto } = route.params;
  const { colors, theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const [placa, setPlaca] = useState(moto.placa);
  const [chassi, setChassi] = useState(moto.chassi);
  const [ano, setAno] = useState(moto.ano.toString());
  const [statusMoto, setStatusMoto] = useState(moto.statusMoto);
  const [idFilial, setIdFilial] = useState(moto.filial.id.toString());

  const [open, setOpen] = useState(false);
  const [modeloMoto, setModeloMoto] = useState(moto.modeloMoto);
  const [items, setItems] = useState(modelosMotoItems);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!placa) newErrors.placa = t("errorRequired");
    if (!chassi || chassi.length !== 17)
      newErrors.chassi = t("errorChassiLength");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
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
      await apiJava.put(`/moto/${moto.id}`, motoData);
      Alert.alert(t("alertSuccess"), t("alertSuccessMotoUpdated"));
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar moto:", error.response?.data || error);
      Alert.alert(t("alertError"), t("alertErrorMotoUpdated"));
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
      <Text style={styles.label}>{t("labelPlaca")}</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        autoCapitalize="characters"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

      <Text style={styles.label}>{t("labelChassi")}</Text>
      <TextInput
        style={styles.input}
        value={chassi}
        onChangeText={setChassi}
        maxLength={17}
        placeholderTextColor={colors.textSecondary}
      />
      {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}

      <Text style={styles.label}>{t("labelModelo")}</Text>
      <DropDownPicker
        open={open}
        value={modeloMoto}
        items={items}
        setOpen={setOpen}
        setValue={setModeloMoto}
        setItems={setItems}
        listMode="MODAL"
        theme={theme.toUpperCase()}
        placeholder={t("placeholderSelectModel")}
        placeholderStyle={{ color: colors.textSecondary }}
        style={styles.dropdown}
        dropDownContainerStyle={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        listItemLabelStyle={{ color: colors.text }}
        selectedItemLabelStyle={{ fontWeight: "bold" }}
        zIndex={1000}
      />

      <Text style={styles.label}>{t("labelAno")}</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        placeholderTextColor={colors.textSecondary}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>{t("labelStatus")}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={colors.white}
            onValueChange={(newValue) =>
              setStatusMoto(newValue ? "ATIVA" : "INATIVA")
            }
            value={statusMoto === "ATIVA"}
          />
          <Text style={styles.statusText}>{statusMoto}</Text>
        </View>
      </View>

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
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      marginBottom: 10,
    },
    statusText: {
      marginLeft: 10,
      fontSize: 16,
      color: colors.text,
      fontWeight: "bold",
    },
  });
