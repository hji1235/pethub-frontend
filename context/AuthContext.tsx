import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, removeAccessToken } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = await getAccessToken();
            if (token) {
                setUser({ token });
            }
        };
        loadUser();
    }, []);

    const logout = async () => {
        await removeAccessToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
