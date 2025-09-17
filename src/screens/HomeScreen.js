import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

// Nossos novos hooks customizados
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';

export default function HomeScreen({ navigation }) {
    const [motosSalvas, setMotosSalvas] = useState([]);
    const isFocused = useIsFocused(); // Hook para saber se a tela está em foco
    const { signOut } = useAuth(); // Função de logout do nosso contexto
    const theme = useTheme(); // cores do tema ativo (claro ou escuro)

    const styles = getStyles(theme);

    const carregarMotos = async () => {
        try {
            const motosJson = await AsyncStorage.getItem('motos_data');
            if (motosJson !== null) {
                setMotosSalvas(JSON.parse(motosJson));
            } else {
                setMotosSalvas([]);
            }
        } catch (e) {
            console.error("Erro ao carregar motos do AsyncStorage", e);
            setMotosSalvas([]);
        }
    };

    useEffect(() => {
        if (isFocused) {
            carregarMotos();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao MotoMap!</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Visualizar Pátio"
                    color={theme.primary}
                    onPress={() => navigation.navigate('PatioVisualizacao')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Registrar Nova Moto"
                    color={theme.primary}
                    onPress={() => navigation.navigate('RegistrarMoto')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Ver Filiais"
                    color={theme.primary}
                    onPress={() => navigation.navigate('Filiais')}
                />
            </View>

            <Text style={styles.listTitle}>Motos Registradas Localmente ({motosSalvas.length}):</Text>
            {motosSalvas.length === 0 ? (
                <Text style={styles.emptyListText}>Nenhuma moto registrada localmente.</Text>
            ) : (
                <FlatList
                    style={styles.list}
                    data={motosSalvas}
                    keyExtractor={(item, index) => item.placa + index}
                    renderItem={({ item }) => (
                        <View style={styles.motoItem}>
                            <Text style={styles.motoItemText}>
                                Placa: {item.placa} - Modelo: {item.modelo} - Status: {item.status}
                            </Text>
                        </View>
                    )}
                />
            )}

            {/* Botão de Logout adicionado no final */}
            <View style={styles.logoutButtonContainer}>
                <Button
                    title="Sair (Logout)"
                    color={theme.danger} // Usando a cor de perigo do tema
                    onPress={signOut}
                />
            </View>
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: theme.background, // Cor de fundo do tema
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.text, // Cor do texto do tema
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 8,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color: theme.text,
    },
    list: {
      width: '100%',
    },
    emptyListText: {
        color: theme.textSecondary, // Cor de texto secundário
    },
    motoItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.border, // Cor da borda do tema
        width: '100%'
    },
    motoItemText: {
        color: theme.text,
    },
    logoutButtonContainer: {
        width: '80%',
        marginTop: 'auto', // Empurra o botão para o final da tela
        marginBottom: 10,
    }
});