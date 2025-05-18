import React from "react";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/header/Header";
import AppRouter from "./routes/AppRouter";

export default function App() {
    const { isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return (
            <div className="main-container">
                Проверяем авторизацию…
            </div>
        );
    }

    return (
        <>
            <Header />
            <AppRouter />
        </>
    );
}
