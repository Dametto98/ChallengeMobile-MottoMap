import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme';
import { apiJava } from '../services/api';

export default function FiliaisScreen({ navigation }) {
    const [filiais, setFiliais] = useState([]);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const styles = getStyles(theme);

    const carregarFiliais = async () => {
        setLoading(true);
        try {
            const response = await apiJava.get('/filial');
            setFiliais(response.data.content || []);
        } catch (error) {
            console.error("Erro ao carregar filiais:", error);
            Alert.alert("Erro", "Não foi possível carregar a lista de filiais.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarFiliais();
        }, [])
    );

    const renderFilialItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.filialItem}
            onPress={() => navigation.navigate('DetalhesFilial', { filialId: item.id })}
        >
            <Text style={styles.filialNome}>{item.nome}</Text>
            <Text style={styles.filialEndereco}>{item.cidade}, {item.siglaEstado}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nossas Filiais</Text>
                <Button
                    title="Registrar Nova Filial"
                    color={theme.primary}
                    onPress={() => navigation.navigate('RegistrarFilial')}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} style={{ flex: 1 }}/>
            ) : (
                <FlatList
                    data={filiais}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFilialItem}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma filial encontrada.</Text>}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    onRefresh={carregarFiliais}
                    refreshing={loading}
                />
            )}
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: { padding: 15, borderBottomWidth: 1, borderBottomColor: theme.border },
    title: { fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 10, textAlign: 'center' },
    filialItem: {
        backgroundColor: theme.card,
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.border,
    },
    filialNome: { fontSize: 18, fontWeight: 'bold', color: theme.text },
    filialEndereco: { fontSize: 14, color: theme.textSecondary, marginTop: 5 },
    emptyListText: { textAlign: 'center', marginTop: 50, color: theme.textSecondary },
});