import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiJava } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@MottoMap:user');
            const storagedToken = await AsyncStorage.getItem('@MottoMap:token');

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    const signIn = async (email, password) => {
        try {
            const response = await apiJava.post('/usuario/login', {
                email: email,
                senha: password, // O backend espera 'senha'
            });

            const { token } = response.data;

            // Para obter os dados do usuário, precisaríamos de outro endpoint ou que o login retornasse mais dados
            // Por simplicidade, vamos armazenar apenas o email por enquanto
            const userData = { email };
            setUser(userData);

            await AsyncStorage.setItem('@MottoMap:user', JSON.stringify(userData));
            await AsyncStorage.setItem('@MottoMap:token', token);

        } catch (error) {
            console.error("Erro no login:", error.response?.data || error.message);
            throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
        }
    };

    const signOut = async () => {
        await AsyncStorage.clear();
        setUser(null);
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