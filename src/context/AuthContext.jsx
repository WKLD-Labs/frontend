import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:5501/api/login', {
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
                setIsLoggedIn(true);
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
        setIsLoggedIn(false);
    };

    const isLogin = () => {
        const token = sessionStorage.getItem('token');
        return isLoggedIn || !!token;
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isLogin }}>
            {children}
        </AuthContext.Provider>
    );
};