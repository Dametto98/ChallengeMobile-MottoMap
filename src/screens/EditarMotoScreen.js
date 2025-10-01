import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../theme';
import { apiJava } from '../services/api';

export default function EditarMotoScreen({ route, navigation }) {
    const { moto } = route.params; // Recebe os dados da moto a ser editada
    const theme = useTheme();
    const styles = getStyles(theme);

    // Pré-popula os estados com os dados da moto existente
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
        if (!chassi) newErrors.chassi = "O chassi é obrigatório.";
        else if (chassi.length !== 17) newErrors.chassi = "O chassi deve ter 17 caracteres.";
        if (!modeloMoto) newErrors.modeloMoto = "O modelo é obrigatório.";
        if (!ano) newErrors.ano = "O ano é obrigatório.";
        else if (isNaN(ano)) newErrors.ano = "O ano deve ser um número.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validate()) {
            return; // Interrompe se a validação falhar
        }
        
        setLoading(true);
        const motoData = {
            placa,
            chassi,
            modeloMoto,
            ano: parseInt(ano),
            statusMoto,
            filial: parseInt(idFilial)
        };

        try {
            await apiJava.put(`/moto/${moto.id}`, motoData);
            Alert.alert("Sucesso!", "Moto atualizada com sucesso.");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao atualizar moto:", error.response?.data || error);
            Alert.alert("Erro", "Não foi possível atualizar a moto.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Placa</Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} autoCapitalize="characters" />
            {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

            <Text style={styles.label}>Chassi</Text>
            <TextInput style={styles.input} value={chassi} onChangeText={setChassi} maxLength={17} />
            {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}
            
            <Text style={styles.label}>Modelo</Text>
            <TextInput style={styles.input} value={modeloMoto} onChangeText={setModeloMoto} />
            {errors.modeloMoto && <Text style={styles.errorText}>{errors.modeloMoto}</Text>}
            
            <Text style={styles.label}>Ano</Text>
            <TextInput style={styles.input} value={ano} onChangeText={setAno} keyboardType="numeric" />
            {errors.ano && <Text style={styles.errorText}>{errors.ano}</Text>}

            <Text style={styles.label}>Status</Text>
            <TextInput style={styles.input} value={statusMoto} onChangeText={setStatusMoto} />
            
            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Salvar Alterações" onPress={handleUpdate} color={theme.primary} />
                </View>
            )}
        </ScrollView>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.background },
    label: { fontSize: 16, color: theme.text, marginBottom: 5, marginTop: 10 },
    input: { backgroundColor: theme.card, color: theme.text, borderWidth: 1, borderColor: theme.border, borderRadius: 5, padding: 10, fontSize: 16 },
    errorText: { color: theme.danger, fontSize: 12, marginTop: 5 },
    buttonContainer: { marginTop: 30 }
});