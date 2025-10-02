import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function EditarMotoScreen({ route, navigation }) {
    const { moto } = route.params;
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [placa, setPlaca] = useState(moto.placa);
    const [chassi, setChassi] = useState(moto.chassi);
    const [modeloMoto, setModeloMoto] = useState(moto.modeloMoto);
    const [ano, setAno] = useState(moto.ano.toString());
    const [statusMoto, setStatusMoto] = useState(moto.statusMoto);
    const [idFilial, setIdFilial] = useState(moto.filial.id.toString());
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!placa) newErrors.placa = "A placa é obrigatória.";
        if (!chassi || chassi.length !== 17) newErrors.chassi = "O chassi deve ter 17 caracteres.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validate()) return;
        
        setLoading(true);
        const motoData = { placa, chassi, modeloMoto, ano: parseInt(ano), statusMoto, filial: parseInt(idFilial) };

        try {
            await apiJava.put(`/moto/${moto.id}`, motoData);
            Alert.alert("Sucesso!", "Moto atualizada com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a moto.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Placa</Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} autoCapitalize="characters" placeholderTextColor={colors.textSecondary} />
            {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

            <Text style={styles.label}>Chassi</Text>
            <TextInput style={styles.input} value={chassi} onChangeText={setChassi} maxLength={17} placeholderTextColor={colors.textSecondary} />
            {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}
            
            <Text style={styles.label}>Modelo</Text>
            <TextInput style={styles.input} value={modeloMoto} onChangeText={setModeloMoto} placeholderTextColor={colors.textSecondary} />
            
            <Text style={styles.label}>Ano</Text>
            <TextInput style={styles.input} value={ano} onChangeText={setAno} keyboardType="numeric" placeholderTextColor={colors.textSecondary} />

            <Text style={styles.label}>Status</Text>
            <TextInput style={styles.input} value={statusMoto} onChangeText={setStatusMoto} placeholderTextColor={colors.textSecondary} />
            
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Salvar Alterações" onPress={handleUpdate} color={colors.primary} />
                </View>
            )}
        </ScrollView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    label: { fontSize: 16, color: colors.text, marginBottom: 5, marginTop: 10 },
    input: { backgroundColor: colors.card, color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, fontSize: 16 },
    errorText: { color: colors.danger, fontSize: 12, marginTop: 5 },
    buttonContainer: { marginTop: 30 }
});