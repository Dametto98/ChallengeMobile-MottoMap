import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../theme';
import { apiJava } from '../services/api';

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

        if (!nome || !email || !senha || !confirmarSenha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            await apiJava.post('/usuario/registrar', {
                nome,
                email,
                senha,
                cargoUsuario: "COL_PATIO", // Valor fixo para simplificar
                filial: 1 // ID da filial fixo para simplificar
            });

            Alert.alert(
                "Sucesso!",
                "Sua conta foi criada. Agora você pode fazer o login.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );

        } catch (err) {
            console.error("Erro no cadastro:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Não foi possível criar a conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua Conta</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome} />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none" />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry />
            <TextInput
                style={styles.input}
                placeholder="Confirme a Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry />

            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Cadastrar" onPress={handleCadastro} color={theme.primary} />
                </View>
            )}
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: theme.background, },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: theme.text, },
    input: { height: 50, borderColor: theme.border, borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, backgroundColor: theme.card, color: theme.text, fontSize: 16, },
    buttonContainer: { marginTop: 10, },
    errorText: { color: theme.danger, textAlign: 'center', marginBottom: 10, fontSize: 14, },
});