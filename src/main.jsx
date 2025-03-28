import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from "./contexts/AuthContext";
import {GameProvider} from "./contexts/GameContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <GameProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </GameProvider>
        </AuthProvider>
    </QueryClientProvider>
);
