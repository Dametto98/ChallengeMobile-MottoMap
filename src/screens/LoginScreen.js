import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; 
import { useTranslation } from 'react-i18next'; 

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { signIn } = useAuth();
    const { colors } = useTheme(); 
    const { t } = useTranslation(); 
    const styles = getStyles(colors); 

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
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image 
                    source={require('../../assets/images/mottomap-logo.png')} 
                    style={styles.logo}
                />
                
                <Text style={styles.title}>{t('welcome')}</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
                
                {error && <Text style={styles.errorText}>{error}</Text>}
                
                <TextInput
                    style={styles.input}
                    placeholder={t('email')}
                    placeholderTextColor={colors.textSecondary} // 4. Usamos 'colors' aqui
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('password')}
                    placeholderTextColor={colors.textSecondary} // 4. Usamos 'colors' aqui
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{marginVertical: 10}} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button title={t('loginButton')} onPress={handleLogin} color={colors.primary} />
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
        </SafeAreaView>
    );
}

// 5. A função agora recebe 'colors' e usa suas propriedades
const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 24,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.text,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.textSecondary,
        marginBottom: 24,
    },
    input: {
        height: 50,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.card,
        color: colors.text,
        fontSize: 16,
    },
    errorText: {
        color: colors.danger,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        marginVertical: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cadastroLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    cadastroText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    cadastroTextBold: {
        fontWeight: 'bold',
        color: colors.primary,
    },
});