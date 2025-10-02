import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function RegistrarMotoScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [placa, setPlaca] = useState('');
    const [chassi, setChassi] = useState('');
    const [modeloMoto, setModeloMoto] = useState('');
    const [ano, setAno] = useState('');
    const [statusMoto, setStatusMoto] = useState('ATIVA');
    const [idFilial, setIdFilial] = useState('1');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!placa) newErrors.placa = "A placa é obrigatória.";
        if (!chassi || chassi.length !== 17) newErrors.chassi = "O chassi deve ter 17 caracteres.";
        if (!modeloMoto) newErrors.modeloMoto = "O modelo é obrigatório.";
        if (!ano || isNaN(ano)) newErrors.ano = "O ano deve ser um número válido.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;
        
        setLoading(true);
        const motoData = { placa, chassi, modeloMoto, ano: parseInt(ano), statusMoto, filial: parseInt(idFilial) };

        try {
            await apiJava.post('/moto', motoData);
            Alert.alert("Sucesso!", "Nova moto registrada.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível registrar a nova moto.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Placa</Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="Ex: BRA2E19" autoCapitalize="characters" placeholderTextColor={colors.textSecondary} />
            {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

            <Text style={styles.label}>Chassi</Text>
            <TextInput style={styles.input} value={chassi} onChangeText={setChassi} placeholder="17 caracteres" maxLength={17} placeholderTextColor={colors.textSecondary} />
            {errors.chassi && <Text style={styles.errorText}>{errors.chassi}</Text>}
            
            <Text style={styles.label}>Modelo</Text>
            <TextInput style={styles.input} value={modeloMoto} onChangeText={setModeloMoto} placeholder="Ex: POP_110I" placeholderTextColor={colors.textSecondary} />
            {errors.modeloMoto && <Text style={styles.errorText}>{errors.modeloMoto}</Text>}
            
            <Text style={styles.label}>Ano</Text>
            <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ex: 2024" keyboardType="numeric" placeholderTextColor={colors.textSecondary} />
            {errors.ano && <Text style={styles.errorText}>{errors.ano}</Text>}
            
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Salvar Nova Moto" onPress={handleSave} color={colors.primary} />
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