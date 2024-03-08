import { FC, ReactNode } from "react";
import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to={"/login"} />
    }
}

export default ProtectedRoute;