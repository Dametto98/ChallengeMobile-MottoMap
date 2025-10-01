import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';

export default function HomeScreen({ navigation }) {
    const { signOut, user } = useAuth();
    const theme = useTheme();
    const styles = getStyles(theme);

    // Mensagem de boas-vindas. Se o user tiver um nome, usa, senão, um genérico.
    const welcomeMessage = user?.name ? `Bem-vindo(a), ${user.name}!` : "Bem-vindo(a)!";

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{welcomeMessage}</Text>
                    <Text style={styles.subtitle}>Selecione uma opção para começar</Text>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity 
                        style={styles.menuButton} 
                        onPress={() => navigation.navigate('MotosList')}
                    >
                        <Text style={styles.menuButtonText}>🏍️ Gerenciar Motos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuButton} 
                        onPress={() => navigation.navigate('PatioVisualizacao')}
                    >
                        <Text style={styles.menuButtonText}>🅿️ Visualizar Pátio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuButton} 
                        onPress={() => navigation.navigate('Filiais')}
                    >
                        <Text style={styles.menuButtonText}>🏢 Nossas Filiais</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutButtonContainer}>
                    <Button title="Sair do App" color={theme.danger} onPress={signOut} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (theme) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between', // Empurra o logout para baixo
    },
    header: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text,
    },
    subtitle: {
        fontSize: 16,
        color: theme.textSecondary,
        marginTop: 8,
    },
    menuContainer: {
        paddingHorizontal: 20,
    },
    menuButton: {
        backgroundColor: theme.card,
        padding: 20,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        // Sombra
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
    },
    logoutButtonContainer: {
        padding: 20,
    }
});