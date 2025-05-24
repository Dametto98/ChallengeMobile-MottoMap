import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados mockados para o pátio
const patioDataMock = [
    { id: 'A1', ocupada: true, moto: { placa: 'ABC-1234', modelo: 'Honda Biz', status: 'PRONTA' } },
    { id: 'A2', ocupada: false, moto: null },
    { id: 'A3', ocupada: true, moto: { placa: 'XYZ-9876', modelo: 'Yamaha Factor', status: 'PROBLEMAS_SIMPLES' } },
    { id: 'B1', ocupada: false, moto: null },
    { id: 'B2', ocupada: false, moto: null },
    { id: 'B3', ocupada: true, moto: { placa: 'DEF-5678', modelo: 'Honda Pop', status: 'MINHA_MOTTU' } },
];

export default function PatioVisualizacaoScreen({ navigation }) {
    const renderVaga = ({ item }) => (
        <TouchableOpacity
            style={[styles.vaga, item.ocupada ? styles.vagaOcupada : styles.vagaLivre]}
            onPress={() => {
                if (item.ocupada) {
                    navigation.navigate('DetalhesMoto', { moto: item.moto });
                }
            }}
        >
            <Text style={styles.vagaText}>{item.id}</Text>
            {item.ocupada && <Text style={styles.vagaMotoText}>Moto: {item.moto.placa}</Text>}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Layout do Pátio (Simulado)</Text>
            <FlatList
                data={patioDataMock}
                renderItem={renderVaga}
                keyExtractor={item => item.id}
                numColumns={3} // Exemplo de visualização em grade
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
    vaga: {
        flex: 1,
        margin: 5,
        padding: 10,
        height: 80, // Altura fixa para melhor visualização em grade
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    vagaLivre: {
        backgroundColor: '#d4edda', // Verde claro
    },
    vagaOcupada: {
        backgroundColor: '#f8d7da', // Vermelho claro
    },
    vagaText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    vagaMotoText: {
        fontSize: 12,
        marginTop: 5,
    },
});