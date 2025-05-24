// screens/HomeScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Para recarregar dados quando a tela volta ao foco
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [motosSalvas, setMotosSalvas] = useState([]);
    const isFocused = useIsFocused(); // Hook para saber se a tela está em foco

    const carregarMotos = async () => {
        try {
            const motosJson = await AsyncStorage.getItem('motos_data');
            if (motosJson !== null) {
                setMotosSalvas(JSON.parse(motosJson));
            } else {
                setMotosSalvas([]); // Define como array vazio se não houver dados
            }
        } catch (e) {
            console.error("Erro ao carregar motos do AsyncStorage", e);
            setMotosSalvas([]);
        }
    };

    useEffect(() => {
        if (isFocused) { // Carrega as motos toda vez que a tela ganha foco
            carregarMotos();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao MotoMap!</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Visualizar Pátio"
                    onPress={() => navigation.navigate('PatioVisualizacao')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Registrar Nova Moto"
                    onPress={() => navigation.navigate('RegistrarMoto')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Ver Filiais"
                    onPress={() => navigation.navigate('Filiais')}
                />
            </View>

            <Text style={styles.listTitle}>Motos Registradas Localmente ({motosSalvas.length}):</Text>
            {motosSalvas.length === 0 ? (
                <Text>Nenhuma moto registrada localmente.</Text>
            ) : (
                <FlatList
                    data={motosSalvas}
                    keyExtractor={(item, index) => item.placa + index} // Usar algo único
                    renderItem={({ item }) => (
                        <View style={styles.motoItem}>
                            <Text>Placa: {item.placa} - Modelo: {item.modelo} - Status: {item.status}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Alterado para flex-start para acomodar a lista
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    motoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%'
    }
});