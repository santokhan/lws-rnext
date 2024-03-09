import { createContext, useContext, useState, useEffect } from 'react';
import axxios from '../axios/axiosInstance';
import React from 'react';

// Create context
const AuthContext = createContext(undefined);

// Custom hook for accessing auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    // State variables
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Effect to check authentication status on component mount
    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');

        const checkAuthStatus = async () => {
            try {
                if (!refreshToken) {
                    setIsLoading(false);
                    return;
                }
                const response = await axxios.post("/auth/refresh-token", { refreshToken });
                const token = response.data;
                setIsAuthenticated(true);
                localStorage.setItem('accessToken', token.accessToken);
                localStorage.setItem('refreshToken', token.refreshToken);
                user && setUser(JSON.parse(user));
            } catch (error) {
                console.error("Error refreshing token:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();

        // Set up token rotation timer
        const tokenRotationTimer = setInterval(() => {
            checkAuthStatus();
        }, 5000);

        // Clean up the timer on component unmount
        return () => {
            clearInterval(tokenRotationTimer);
        };
    }, []);

    const login = async (credentials) => {
        try {
            const res = await axxios.post("/auth/login", credentials);
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

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    // Provide auth context value
    const authContextValue = {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout
    };

    // Return AuthProvider with context value
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
