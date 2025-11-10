import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiJava } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import i18n from '../services/i18n';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await AsyncStorage.getItem('@MottoMap:user');
                const storagedToken = await AsyncStorage.getItem('@MottoMap:token');

                if (storagedUser && storagedToken) {
                    try {
                        const parsedUser = JSON.parse(storagedUser);
                        setUser(parsedUser);
                    } catch (parseError) {
                        console.error("[AuthContext] Erro ao fazer parse do usuário:", parseError);
                        // Limpa dados corrompidos
                        await AsyncStorage.removeItem('@MottoMap:user');
                        await AsyncStorage.removeItem('@MottoMap:token');
                    }
                }
            } catch (e) {
                console.error("[AuthContext] Erro ao carregar dados do AsyncStorage:", e);
            } finally {
                setLoading(false);
            }
        }
        loadStorageData();
    }, []);

    const signIn = async (email, password) => {
        try {
            console.log("[AuthContext] 1. Iniciando signIn...");
            const response = await apiJava.post('/usuario/login', {
                email: email,
                senha: password,
            });
            console.log("[AuthContext] 2. Login na API com sucesso.");

            // --- ALTERAÇÃO AQUI ---
            const { token, usuarioId, nomeUsuario } = response.data;

            // Agora salvamos o objeto de usuário completo
            const userData = { id: usuarioId, nome: nomeUsuario, email: email };
            setUser(userData);

            console.log("[AuthContext] 3. Salvando dados no AsyncStorage...");
            await AsyncStorage.setItem('@MottoMap:user', JSON.stringify(userData));
            await AsyncStorage.setItem('@MottoMap:token', token);
            console.log("[AuthContext] 4. Dados salvos. Chamando registro de notificação...");

            await registerForPushNotificationsAsync(); 
            
            console.log("[AuthContext] 5. Registro de notificação concluído.");

        } catch (error) {
            console.error("[AuthContext] ERRO no try/catch do signIn:", error); 

            let errorMessage = i18n.t('errorLoginGeneric');

            if (error.response && error.response.data && error.response.data.erro) {
                errorMessage = error.response.data.erro;
            } 
            else if (error.request) {
                errorMessage = i18n.t('errorNetwork');
            }

            // Repassamos o erro original se a mensagem não foi tratada
            throw new Error(errorMessage || error.message);
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.clear();
            setUser(null);
        } catch (e) {
            console.error("[AuthContext] Erro ao fazer signOut:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};