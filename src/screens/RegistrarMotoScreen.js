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
import { useTranslation } from 'react-i18next';

const modelosMotoItems = [
  { label: "POP_110I", value: "POP_110I" },
  { label: "MOTTU_E_MAX", value: "MOTTU_E_MAX" },
  { label: "MOTTU_SPORT_ESD", value: "MOTTU_SPORT_ESD" },
  { label: "MOTTU_SPORT", value: "MOTTU_SPORT" },
];

export default function RegistrarMotoScreen({ navigation }) {
  const { colors, theme } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

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
    if (!placa) newErrors.placa = t('errorRequired');
    if (!chassi || chassi.length !== 17) newErrors.chassi = t('errorChassiLength');
    if (!modeloMoto) newErrors.modeloMoto = t('errorRequired');
    if (!ano || isNaN(ano)) newErrors.ano = t('errorYearInvalid');
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
      Alert.alert(t('alertSuccess'), t('alertSuccessMotoRegistered'));
      navigation.goBack();
    } catch (error) {
      Alert.alert(t('alertError'), t('alertErrorMotoRegistered'));
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
      <Text style={styles.label}>{t('labelPlaca')}</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder={t('placeholderPlaca')}
        autoCapitalize="characters"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

      <Text style={styles.label}>{t('labelChassi')}</Text>
      <TextInput
        style={styles.input}
        value={chassi}
        onChangeText={setChassi}
        placeholder={t('placeholderChassi')}
        maxLength={17}
        placeholderTextColor={colors.textSecondary}
      />
      {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}

      <Text style={styles.label}>{t('labelModelo')}</Text>
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
        placeholder={t('placeholderSelectModel')}
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

      <Text style={styles.label}><Text style={styles.label}>{t('labelAno')}</Text></Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder={t('placeholderAno')}
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
            title={t('saveButton')}
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
