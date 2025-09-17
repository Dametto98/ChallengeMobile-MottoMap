import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme';
import { useTranslation } from 'react-i18next'; 

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { signIn } = useAuth();
    const theme = useTheme();
    const { t } = useTranslation(); 
    const styles = getStyles(theme);

    const handleLogin = async () => {
        if (!email || !password) {
            setError(t('errorFillFields')); 
            return;
        }
        setLoading(true);
        setError('');
        try {
            await signIn(email, password);
        } catch (err) {
            setError(t('errorInvalidCredentials')); 
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* 4. SUBSTITUA TODO TEXTO FIXO PELA FUNÇÃO t('chave') */}
            <Text style={styles.title}>{t('welcome')}</Text>
            
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            <TextInput
                style={styles.input}
                placeholder={t('email')}
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={t('password')}
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title={t('loginButton')} onPress={handleLogin} color={theme.primary} />
                </View>
            )}
            
            <TouchableOpacity 
                style={styles.cadastroLink}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.cadastroText}>
                    {t('registerPrompt')} <Text style={styles.cadastroTextBold}>{t('registerLink')}</Text>
                </Text>
            </TouchableOpacity>
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
    buttonContainer: {
        marginVertical: 10,
    },
    cadastroLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    cadastroText: {
        color: theme.textSecondary,
        fontSize: 14,
    },
    cadastroTextBold: {
        fontWeight: 'bold',
        color: theme.primary,
    },
});