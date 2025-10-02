import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function RegistrarFilialScreen({ navigation }) {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [siglaEstado, setSiglaEstado] = useState('');
    const [numeroLinha, setNumeroLinha] = useState('');
    const [numeroColuna, setNumeroColuna] = useState('');
    const [capacidadeMaxima, setCapacidadeMaxima] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!nome) newErrors.nome = "O nome é obrigatório.";
        if (!endereco) newErrors.endereco = "O endereço é obrigatório.";
        if (!cidade) newErrors.cidade = "A cidade é obrigatória.";
        if (!siglaEstado) newErrors.siglaEstado = "A sigla do estado é obrigatória.";
        else if (siglaEstado.length !== 2) newErrors.siglaEstado = "A sigla deve ter 2 caracteres.";
        if (!numeroLinha || isNaN(numeroLinha)) newErrors.numeroLinha = "Informe um número válido de linhas.";
        if (!numeroColuna || isNaN(numeroColuna)) newErrors.numeroColuna = "Informe um número válido de colunas.";
        if (!capacidadeMaxima || isNaN(capacidadeMaxima)) newErrors.capacidadeMaxima = "Informe uma capacidade válida.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
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
            await apiJava.post('/filial', filialData);
            Alert.alert("Sucesso!", "Nova filial registrada.");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar filial:", error.response?.data || error);
            Alert.alert("Erro", "Não foi possível registrar a nova filial.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Nome da Filial</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor={colors.textSecondary} />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.label}>Endereço</Text>
            <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholderTextColor={colors.textSecondary} />
            {errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}
            
            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholderTextColor={colors.textSecondary} />
            {errors.cidade && <Text style={styles.errorText}>{errors.cidade}</Text>}

            <Text style={styles.label}>Sigla do Estado (UF)</Text>
            <TextInput style={styles.input} value={siglaEstado} onChangeText={setSiglaEstado} maxLength={2} autoCapitalize="characters" placeholderTextColor={colors.textSecondary} />
            {errors.siglaEstado && <Text style={styles.errorText}>{errors.siglaEstado}</Text>}

            <Text style={styles.label}>Nº de Linhas do Pátio</Text>
            <TextInput style={styles.input} value={numeroLinha} onChangeText={setNumeroLinha} keyboardType="numeric" placeholderTextColor={colors.textSecondary} />
            {errors.numeroLinha && <Text style={styles.errorText}>{errors.numeroLinha}</Text>}

            <Text style={styles.label}>Nº de Colunas do Pátio</Text>
            <TextInput style={styles.input} value={numeroColuna} onChangeText={setNumeroColuna} keyboardType="numeric" placeholderTextColor={colors.textSecondary} />
            {errors.numeroColuna && <Text style={styles.errorText}>{errors.numeroColuna}</Text>}

            <Text style={styles.label}>Capacidade Máxima</Text>
            <TextInput style={styles.input} value={capacidadeMaxima} onChangeText={setCapacidadeMaxima} keyboardType="numeric" placeholderTextColor={colors.textSecondary} />
            {errors.capacidadeMaxima && <Text style={styles.errorText}>{errors.capacidadeMaxima}</Text>}
            
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Salvar Nova Filial" onPress={handleSave} color={colors.primary} />
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
    buttonContainer: { marginTop: 30, marginBottom: 20 }
});