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
            Alert.alert("Erro", "Não foi possível carregar a lista de filiais.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { carregarFiliais(); }, []));

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
    filialItem: { backgroundColor: colors.card, padding: 16, marginVertical: 8, marginHorizontal: 16, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    filialNome: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    filialEndereco: { fontSize: 14, color: colors.textSecondary, marginTop: 5 },
    emptyListText: { textAlign: 'center', marginTop: 50, color: colors.textSecondary },
});