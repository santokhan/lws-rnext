import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import React from 'react';

const LogoutPage = () => {
    const { logout } = useAuth();

    logout();

    return <Navigate to="/login" />;
};

export default LogoutPage;