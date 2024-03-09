import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";
import React from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to={"/login"} />
    }
}

export default ProtectedRoute;