import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiJava } from '../services/api'; // Importe nossa API
import { useTheme } from '../theme'; // Importe nosso hook de tema

export default function PatioVisualizacaoScreen({ navigation }) {
    const [patioData, setPatioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme(); // Use o tema aqui!

    const carregarPatio = async () => {
        try {
            setLoading(true);
            setError(null);
            // ATENÇÃO: Ajuste o ID da filial conforme necessário (ex: /filiais/1/mapa)
            const response = await apiJava.get('/filiais/1/mapa'); 
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

    // Estilos dinâmicos baseados no tema
    const styles = getStyles(theme);

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color={theme.primary} /></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;
    }
    
    const renderVaga = ({ item }) => (
        <TouchableOpacity
            style={[styles.vaga, item.ocupada ? styles.vagaOcupada : styles.vagaLivre]}
            onPress={() => item.ocupada && navigation.navigate('DetalhesMoto', { moto: item.moto })}
        >
            <Text style={styles.vagaText}>{item.id}</Text>
            {item.ocupada && <Text style={styles.vagaMotoText}>Moto: {item.moto.placa}</Text>}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Layout do Pátio</Text>
            <FlatList
                data={patioData}
                renderItem={renderVaga}
                keyExtractor={item => item.id}
                numColumns={3}
                refreshing={loading}
                onRefresh={carregarPatio} // Permite "puxar para atualizar"
            />
        </View>
    );
}

// Função que cria os estilos usando o tema
const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    errorText: {
        color: theme.danger,
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: theme.text,
    },
    vaga: {
        flex: 1,
        margin: 5,
        padding: 10,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 5,
    },
    vagaLivre: {
        backgroundColor: '#d4edda', // Manter cores de status ou usar do tema
    },
    vagaOcupada: {
        backgroundColor: '#f8d7da', // Manter cores de status ou usar do tema
    },
    vagaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
    },
    vagaMotoText: {
        fontSize: 12,
        marginTop: 5,
        color: theme.textSecondary,
    },
});