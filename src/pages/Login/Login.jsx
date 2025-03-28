import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login as apiLogin } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: ({ username, password }) => apiLogin(username, password),
        onSuccess: (response, variables) => {
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username });
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка авторизации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при авторизации", error);
        }
    });

    const handleLogin = (formData) => {
        mutate({
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <div>
            <AuthForm
                onSubmit={handleLogin}
                error={error?.message}
                isLoading={isLoading}
                formType="login"
            />
        </div>
    );
};

export default Login;
