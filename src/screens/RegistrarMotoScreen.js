import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { apiJava } from '../services/api';

const STATUS_OPCOES = ['ATIVA', 'INATIVA'];
const MODELO_OPCOES = ['POP_110I', 'SPORT_110I']; // Adapte para os modelos do seu ENUM

export default function RegistrarMotoScreen({ navigation }) {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [status, setStatus] = useState(STATUS_OPCOES[0]);
    const [filial, setFilial] = useState('1'); // ID da filial, ex: "1"
    const [chassi, setChassi] = useState(''); // NOVO
    const [ano, setAno] = useState(''); // NOVO

    const handleSalvarMoto = async () => {
        if (!placa || !modelo || !status || !filial || !chassi || !ano) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        const novaMoto = {
            placa,
            chassi,
            modeloMoto: modelo,
            ano: parseInt(ano),
            statusMoto: status,
            filial: parseInt(filial)
        };

        try {
            await apiJava.post('/moto', novaMoto);
            Alert.alert("Sucesso", "Moto registrada no sistema!");
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao salvar moto:", e.response?.data || e.message);
            Alert.alert("Erro", "Não foi possível registrar a moto no sistema.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Placa da Moto:</Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="Ex: ABC1D23" />
            
            {/* NOVO CAMPO */}
            <Text style={styles.label}>Chassi:</Text>
            <TextInput style={styles.input} value={chassi} onChangeText={setChassi} placeholder="17 caracteres do chassi" />

            <Text style={styles.label}>Modelo:</Text>
            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder={`Ex: ${MODELO_OPCOES.join(', ')}`} />
            <Text style={styles.infoSmall}>Opções: {MODELO_OPCOES.join(', ')}</Text>

            {/* NOVO CAMPO */}
            <Text style={styles.label}>Ano:</Text>
            <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ex: 2023" keyboardType="numeric" />

            <Text style={styles.label}>Status:</Text>
            <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder={`Ex: ${STATUS_OPCOES.join(', ')}`} />
            <Text style={styles.infoSmall}>Opções: {STATUS_OPCOES.join(', ')}</Text>

            <Text style={styles.label}>ID da Filial:</Text>
            <TextInput style={styles.input} value={filial} onChangeText={setFilial} placeholder="Ex: 1" keyboardType="numeric" />

            <View style={{marginTop: 20}}>
              <Button title="Salvar Moto" color={"#4CAF50"} onPress={handleSalvarMoto} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { fontSize: 16, marginBottom: 5, marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 5, fontSize: 16 },
    infoSmall: { fontSize: 12, color: '#666', marginBottom: 10 },
});