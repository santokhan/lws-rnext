import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        const checkAuthStatus = async () => {
            try {
                if (!refreshToken) {
                    setIsLoading(false);
                    return;
                }
                const response = await axios.post("/auth/refresh-token", { refreshToken });
                const token = response.data;
                setIsAuthenticated(true);
                localStorage.setItem('accessToken', token.accessToken);
                localStorage.setItem('refreshToken', token.refreshToken);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();

        const tokenRotationTimer = setInterval(checkAuthStatus, 600000);

        return () => clearInterval(tokenRotationTimer);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await axios.post("/auth/login", credentials);
            const data = res.data;
            setUser(data.user);
            setIsAuthenticated(true);
            localStorage.setItem("accessToken", data.token.accessToken);
            localStorage.setItem("refreshToken", data.token.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
