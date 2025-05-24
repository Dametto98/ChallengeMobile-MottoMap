// screens/FiliaisScreen.js
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Dados mockados de filiais
const filiaisMock = [
    { id: '1', nome: 'Filial Centro SP', endereco: 'Rua Principal, 123' },
    { id: '2', nome: 'Filial Zona Sul RJ', endereco: 'Avenida Atlântica, 456' },
    { id: '3', nome: 'Filial Leste MG', endereco: 'Praça da Matriz, 789' },
    { id: '4', nome: 'Filial Oeste BA', endereco: 'Rodovia do Sol, 101' },
];

export default function FiliaisScreen() {
    const renderFilial = ({ item }) => (
        <View style={styles.filialItem}>
            <Text style={styles.filialNome}>{item.nome}</Text>
            <Text style={styles.filialEndereco}>{item.endereco}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nossas Filiais</Text>
            <FlatList
                data={filiaisMock}
                renderItem={renderFilial}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    filialItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    filialNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    filialEndereco: {
        fontSize: 14,
        color: '#555',
    },
});