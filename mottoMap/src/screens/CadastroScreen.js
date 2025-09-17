import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../theme';

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const theme = useTheme();
    const styles = getStyles(theme);

    const handleCadastro = async () => {
    setError('');

    // Validações básicas
    if (!nome || !email || !senha || !confirmarSenha) {
        setError('Por favor, preencha todos os campos.');
        return;
    }
    if (senha !== confirmarSenha) {
        setError('As senhas não coincidem.');
        return;
    }

    setLoading(true);

    setTimeout(()=>{
        setLoading(false);
        
        Alert.alert(
            "Sucesso!",
            "Sua conta foi criada. Agora você pode fazer o login.",
            [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]
            );
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua Conta</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor={theme.textSecondary}
                value={nome}
                onChangeText={setNome}
            />
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
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirme a Senha"
                placeholderTextColor={theme.textSecondary}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />

            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }}/>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Cadastrar" onPress={handleCadastro} color={theme.primary} />
                </View>
            )}
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
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: theme.card,
        color: theme.text,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
    },
    errorText: {
        color: theme.danger,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
});