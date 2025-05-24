// screens/DetalhesMotoScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetalhesMotoScreen({ route }) {
    const { moto } = route.params; // Recebe os dados da moto via parâmetros de navegação

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Moto</Text>
            {moto ? (
                <>
                    <Text style={styles.detailItem}>Placa: {moto.placa}</Text>
                    <Text style={styles.detailItem}>Modelo: {moto.modelo}</Text>
                    <Text style={styles.detailItem}>Status: {moto.status}</Text>
                    {/* Adicione mais detalhes conforme necessário */}
                </>
            ) : (
                <Text>Nenhuma informação da moto disponível.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    detailItem: {
        fontSize: 18,
        marginBottom: 10,
    },
});