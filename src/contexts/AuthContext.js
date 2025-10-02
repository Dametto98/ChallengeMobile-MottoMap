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
                senha: password,
            });

            const { token } = response.data;
            const userData = { email };
            setUser(userData);

            await AsyncStorage.setItem('@MottoMap:user', JSON.stringify(userData));
            await AsyncStorage.setItem('@MottoMap:token', token);

        } catch (error) {
            let errorMessage = 'Ocorreu um erro inesperado ao tentar fazer o login.';

            if (error.response && error.response.data && error.response.data.erro) {
                errorMessage = error.response.data.erro;
            } 
            else if (error.request) {
                errorMessage = 'Não foi possível conectar ao servidor. Verifique sua rede.';
            }

            throw new Error(errorMessage);
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