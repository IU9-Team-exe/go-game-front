import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
    const { user, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <div>Загрузка…</div>;
    }
    return user ? children : <Navigate to="/login" replace />;
}
