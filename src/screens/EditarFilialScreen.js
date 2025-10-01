import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../theme';
import { apiJava } from '../services/api';

export default function EditarFilialScreen({ route, navigation }) {
    const { filial } = route.params;
    const theme = useTheme();
    const styles = getStyles(theme);

    const [nome, setNome] = useState(filial.nome);
    const [endereco, setEndereco] = useState(filial.endereco);
    const [cidade, setCidade] = useState(filial.cidade);
    const [siglaEstado, setSiglaEstado] = useState(filial.siglaEstado);
    const [numeroLinha, setNumeroLinha] = useState(String(filial.numeroLinha));
    const [numeroColuna, setNumeroColuna] = useState(String(filial.numeroColuna));
    const [capacidadeMaxima, setCapacidadeMaxima] = useState(String(filial.capacidadeMaxima));
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!nome) newErrors.nome = "O nome é obrigatório.";
        if (!siglaEstado || siglaEstado.length !== 2) newErrors.siglaEstado = "A sigla deve ter 2 caracteres.";
        if (!numeroLinha || isNaN(numeroLinha)) newErrors.numeroLinha = "Informe um número válido de linhas.";
        // ... adicione outras validações se desejar
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
            Alert.alert("Sucesso!", "Filial atualizada.");
            navigation.navigate('Filiais'); // Volta para a lista
        } catch (error) {
            console.error("Erro ao atualizar filial:", error.response?.data || error);
            Alert.alert("Erro", "Não foi possível atualizar a filial.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Nome da Filial</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.label}>Endereço</Text>
            <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
            
            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />

            <Text style={styles.label}>Sigla do Estado (UF)</Text>
            <TextInput style={styles.input} value={siglaEstado} onChangeText={setSiglaEstado} maxLength={2} autoCapitalize="characters" />
            {errors.siglaEstado && <Text style={styles.errorText}>{errors.siglaEstado}</Text>}

            <Text style={styles.label}>Nº de Linhas do Pátio</Text>
            <TextInput style={styles.input} value={numeroLinha} onChangeText={setNumeroLinha} keyboardType="numeric" />
            {errors.numeroLinha && <Text style={styles.errorText}>{errors.numeroLinha}</Text>}

            <Text style={styles.label}>Nº de Colunas do Pátio</Text>
            <TextInput style={styles.input} value={numeroColuna} onChangeText={setNumeroColuna} keyboardType="numeric" />

            <Text style={styles.label}>Capacidade Máxima</Text>
            <TextInput style={styles.input} value={capacidadeMaxima} onChangeText={setCapacidadeMaxima} keyboardType="numeric" />
            
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
    buttonContainer: { marginTop: 30, marginBottom: 20 }
});