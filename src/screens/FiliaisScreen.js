import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function FiliaisScreen({ navigation }) {
    const [filiais, setFiliais] = useState([]);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const carregarFiliais = async () => {
        setLoading(true);
        try {
            const response = await apiJava.get('/filial');
            setFiliais(response.data.content || []);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar la lista de filiais.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { carregarFiliais(); }, []));

    // 1. CRIAMOS A FUNÇÃO PARA DELETAR UMA FILIAL
    const handleDelete = (filialId, filialNome) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja apagar a filial "${filialNome}"? Todas as vagas e motos associadas podem ser perdidas.`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sim, Apagar", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await apiJava.delete(`/filial/${filialId}`);
                            Alert.alert("Sucesso", "Filial apagada.");
                            // Recarrega a lista para remover o item deletado
                            carregarFiliais();
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível apagar a filial.");
                        }
                    }
                }
            ]
        );
    };

    // 2. MODIFICAMOS O ITEM DA LISTA PARA INCLUIR OS BOTÕES
    const renderFilialItem = ({ item }) => (
        <View style={styles.filialItem}>
            {/* Área clicável para ver o pátio */}
            <TouchableOpacity onPress={() => navigation.navigate('PatioVisualizacao', { filialId: item.id, filialNome: item.nome })}>
                <Text style={styles.filialNome}>{item.nome}</Text>
                <Text style={styles.filialEndereco}>{item.cidade}, {item.siglaEstado}</Text>
            </TouchableOpacity>

            {/* Container para os botões de ação */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('EditarFilial', { filial: item })}
                >
                    <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id, item.nome)}
                >
                    <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button
                    title="Registrar Nova Filial"
                    color={colors.primary}
                    onPress={() => navigation.navigate('RegistrarFilial')}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }}/>
            ) : (
                <FlatList
                    data={filiais}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFilialItem}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma filial encontrada.</Text>}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    onRefresh={carregarFiliais}
                    refreshing={loading}
                />
            )}
        </SafeAreaView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    filialItem: { 
        backgroundColor: colors.card, 
        padding: 16, 
        marginVertical: 8, 
        borderRadius: 12, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        shadowOffset: { width: 0, height: 2 } 
    },
    filialNome: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    filialEndereco: { fontSize: 14, color: colors.textSecondary, marginTop: 5, marginBottom: 16 }, // Adicionado margem inferior
    emptyListText: { textAlign: 'center', marginTop: 50, color: colors.textSecondary },

    // 3. ADICIONAMOS OS NOVOS ESTILOS PARA OS BOTÕES
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 16,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: colors.primary,
    },
    deleteButton: {
        backgroundColor: colors.danger,
    },
    actionButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    }
});