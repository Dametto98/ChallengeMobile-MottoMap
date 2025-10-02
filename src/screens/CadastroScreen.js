import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { colors } = useTheme();
    const styles = getStyles(colors);

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
                cargoUsuario: "COL_PATIO",
                filial: 1
            });
            Alert.alert(
                "Sucesso!",
                "Sua conta foi criada. Agora você pode fazer o login.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
        } catch (err) {
            setError(err.response?.data?.message || 'Não foi possível criar a conta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Crie sua Conta</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor={colors.textSecondary}
                    value={nome}
                    onChangeText={setNome} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor={colors.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none" />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.textSecondary}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a Senha"
                    placeholderTextColor={colors.textSecondary}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry />

                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button title="Cadastrar" onPress={handleCadastro} color={colors.primary} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: colors.text },
    input: { height: 50, borderColor: colors.border, borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, backgroundColor: colors.card, color: colors.text, fontSize: 16 },
    buttonContainer: { marginTop: 10 },
    errorText: { color: colors.danger, textAlign: 'center', marginBottom: 10, fontSize: 14 },
});