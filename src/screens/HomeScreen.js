import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';
import { apiJava } from '../services/api';

export default function HomeScreen({ navigation }) {
    const [motos, setMotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { signOut } = useAuth();
    const theme = useTheme();
    const styles = getStyles(theme);

    const carregarMotos = async () => {
        setLoading(true);
        try {
            const response = await apiJava.get('/moto');
            // A API retorna um objeto paginado, os dados estão em 'content'
            setMotos(response.data.content || []); 
        } catch (error) {
            console.error("Erro ao carregar motos:", error);
            Alert.alert("Erro", "Não foi possível carregar a lista de motos.");
            setMotos([]);
        } finally {
            setLoading(false);
        }
    };

    // useFocusEffect recarrega os dados toda vez que a tela recebe foco
    useFocusEffect(
        useCallback(() => {
            carregarMotos();
        }, [])
    );

    const renderMotoItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.motoItem}
            onPress={() => navigation.navigate('DetalhesMoto', { motoId: item.id })}
        >
            <Text style={styles.motoItemText}>Placa: {item.placa}</Text>
            <Text style={styles.motoItemTextSecondary}>Modelo: {item.modeloMoto}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Motos da Frota</Text>
                <Button
                    title="Registrar Nova Moto"
                    color={theme.primary}
                    onPress={() => navigation.navigate('RegistrarMoto')}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={motos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMotoItem}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma moto encontrada.</Text>}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    onRefresh={carregarMotos} // Puxar para atualizar
                    refreshing={loading}
                />
            )}
            
            <View style={styles.logoutButtonContainer}>
                <Button title="Sair (Logout)" color={theme.danger} onPress={signOut} />
            </View>
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    motoItem: {
        backgroundColor: theme.card,
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.border,
    },
    motoItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
    },
    motoItemTextSecondary: {
        fontSize: 14,
        color: theme.textSecondary,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        color: theme.textSecondary,
    },
    logoutButtonContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: theme.border,
    }
});