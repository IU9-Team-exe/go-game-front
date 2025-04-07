import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { register as apiRegister } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const mutation = useMutation({
        mutationFn: ({ username, password, email }) =>
            apiRegister(username, password, email),
        onSuccess: (response, variables) => {
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username });
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка регистрации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при регистрации", error);
        }
    });

    const handleRegister = (formData) => {
        mutation.mutate({
            username: formData.username,
            password: formData.password,
            email: formData.email,
        });
    };

    return (
        <div>
            <RegisterForm
                onSubmit={handleRegister}
                error={mutation.error?.message}
                isLoading={mutation.isLoading}
            />
        </div>
    );
};

export default Register;
