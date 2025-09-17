import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Se for null, não está logado

    const signIn = async (email, password) => {
        console.log("Tentando login com:", email, password);
        // Aqui entraria a chamada para a API .NET
        // Por enquanto, vamos simular sucesso após 1 segundo
        return new Promise(resolve => {
            setTimeout(() => {
                setUser({ name: 'Usuário Mock', email: email });
                resolve();
            }, 1000);
        });
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
};