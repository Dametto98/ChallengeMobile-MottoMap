// screens/RegistrarMotoScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Mock de status para simplificar, poderia ser um Picker
const STATUS_OPCOES = ['PRONTA', 'MINHA_MOTTU', 'PROBLEMAS_SIMPLES', 'PROBLEMAS_GRAVES', 'IRRECUPERAVEL'];

export default function RegistrarMotoScreen({ navigation }) {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [status, setStatus] = useState(STATUS_OPCOES[0]); // Default para o primeiro status
    const [filial, setFilial] = useState(''); // Ex: 'Filial Centro'
    const [vagaLinha, setVagaLinha] = useState('');
    const [vagaColuna, setVagaColuna] = useState('');

    // Exibe os dados digitados dinamicamente
    const dadosAtuais = `Placa: ${placa}\nModelo: ${modelo}\nStatus: ${status}\nFilial: ${filial}\nVaga: L${vagaLinha}C${vagaColuna}`;

    const handleSalvarMoto = async () => {
        if (!placa || !modelo || !status || !filial || !vagaLinha || !vagaColuna) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        const novaMoto = {
            placa,
            modelo,
            status,
            filial,
            vaga: `L${vagaLinha}C${vagaColuna}`,
            timestamp: new Date().toISOString() // Para ter um ID ou data de registro
        };

        try {
            // Carrega motos existentes
            const motosJson = await AsyncStorage.getItem('motos_data');
            let motosArray = motosJson ? JSON.parse(motosJson) : [];

            // Adiciona nova moto
            motosArray.push(novaMoto);

            // Salva array atualizado
            await AsyncStorage.setItem('motos_data', JSON.stringify(motosArray));

            Alert.alert("Sucesso", "Moto registrada localmente!");
            // Limpar formulário
            setPlaca('');
            setModelo('');
            setStatus(STATUS_OPCOES[0]);
            setFilial('');
            setVagaLinha('');
            setVagaColuna('');
            navigation.goBack(); // Ou navega para outra tela, como a Home
        } catch (e) {
            console.error("Erro ao salvar moto no AsyncStorage", e);
            Alert.alert("Erro", "Não foi possível salvar a moto.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Placa da Moto:</Text>
            <TextInput
                style={styles.input}
                value={placa}
                onChangeText={setPlaca}
                placeholder="Ex: ABC-1234"
                autoCapitalize="characters"
            />

            <Text style={styles.label}>Modelo:</Text>
            <TextInput
                style={styles.input}
                value={modelo}
                onChangeText={setModelo}
                placeholder="Ex: Honda Biz 125"
            />

            <Text style={styles.label}>Status:</Text>
            {/* Poderia ser um Picker aqui. Por simplicidade, um TextInput ou seleção mock */}
            <TextInput
                style={styles.input}
                value={status}
                onChangeText={setStatus} // O ideal seria um Picker para limitar as opções
                placeholder={`Ex: ${STATUS_OPCOES.join(', ')}`}
            />
            <Text style={styles.infoSmall}>Opções: {STATUS_OPCOES.join(', ')}</Text>


            <Text style={styles.label}>Filial:</Text>
            <TextInput
                style={styles.input}
                value={filial}
                onChangeText={setFilial}
                placeholder="Ex: Filial Centro"
            />

            <Text style={styles.label}>Vaga - Linha:</Text>
            <TextInput
                style={styles.input}
                value={vagaLinha}
                onChangeText={setVagaLinha}
                placeholder="Ex: A"
                keyboardType="default"
            />

            <Text style={styles.label}>Vaga - Coluna:</Text>
            <TextInput
                style={styles.input}
                value={vagaColuna}
                onChangeText={setVagaColuna}
                placeholder="Ex: 01"
                keyboardType="numeric"
            />

            <View style={styles.dadosDinamicosContainer}>
                <Text style={styles.dadosDinamicosTitle}>Dados Sendo Inseridos:</Text>
                <Text>{dadosAtuais}</Text>
            </View>

            <Button title="Salvar Moto" onPress={handleSalvarMoto} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5, // Reduzido para caber o infoSmall
        fontSize: 16,
    },
    infoSmall: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    dadosDinamicosContainer: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    dadosDinamicosTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});