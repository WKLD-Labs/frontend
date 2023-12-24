import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:5500/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
            });
            if (response.status === 200) {
                const userData = await response.json();
                setUser(userData);
                setAccessToken(userData.accessToken);
                return userData;
            } else if (response.status === 401) {
                setUser(null);
                setAccessToken(null);
                throw new Error('Invalid credentials');
            } else {
                throw new Error('Unexpected error occurred');
            }
        }
        catch (error){
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};