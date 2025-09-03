// src/screens/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { signIn } = useAuth();
    const theme = useTheme();
    const styles = getStyles(theme);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await signIn(email, password);
            // Se o signIn der certo, o re-render da navegação nos levará para a Home
        } catch (err) {
            setError('Usuário ou senha inválidos.'); // Simulação de erro
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao MotoMap</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} />
            ) : (
                <Button title="Entrar" onPress={handleLogin} color={theme.primary} />
            )}
            
            {/* Adicione um botão para cadastro se desejar */}
            {/* <Button title="Criar Conta" onPress={() => navigation.navigate('Cadastro')} /> */}
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: theme.text,
    },
    input: {
        height: 50,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: theme.card,
        color: theme.text,
    },
    errorText: {
        color: theme.danger,
        textAlign: 'center',
        marginBottom: 10,
    },
});