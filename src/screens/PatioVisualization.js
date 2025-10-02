import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiJava } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

export default function PatioVisualizacaoScreen({ navigation }) {
    const [patioData, setPatioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const carregarPatio = async () => {
        try {
            setLoading(true);
            setError(null);
            // ROTA CORRIGIDA PARA O NOVO ENDPOINT
            const response = await apiJava.get('/filial/1/posicoes');
            setPatioData(response.data);
        } catch (err) {
            console.error("Erro ao buscar dados do pátio:", err);
            setError("Não foi possível carregar os dados do pátio.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarPatio();
    }, []);

     if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color={colors.primary} /></View>;
    }
    if (error) {
        return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
    }
    
    const renderVaga = ({ item }) => (
        <TouchableOpacity
            style={[styles.vaga, item.ocupado ? styles.vagaOcupada : styles.vagaLivre]}
            onPress={() => item.ocupado && item.moto && navigation.navigate('DetalhesMoto', { motoId: item.moto.id })}
        >
            <Text style={styles.vagaText}>{item.identificacao}</Text>
            {item.ocupado && item.moto && <Text style={styles.vagaMotoText}>Placa: {item.moto.placa}</Text>}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Layout do Pátio</Text>
            <FlatList
                data={patioData}
                renderItem={renderVaga}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                refreshing={loading}
                onRefresh={carregarPatio}
            />
        </View>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: colors.background },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    errorText: { color: colors.danger, fontSize: 16 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: colors.text },
    vaga: { flex: 1, margin: 5, padding: 10, height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8 },
    // Usando as cores do tema para as vagas
    vagaLivre: {
        backgroundColor: colors.status_ok,
    },
    vagaOcupada: {
        backgroundColor: colors.status_danger,
    },
    vagaText: { fontSize: 16, fontWeight: 'bold', color: colors.text },
    vagaMotoText: { fontSize: 12, marginTop: 5, color: colors.textSecondary },
});