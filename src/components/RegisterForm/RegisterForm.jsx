import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onSubmit, error, isLoading }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // переименовано из nickname
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirm) {
            alert("Пароли не совпадают");
            return;
        }
        onSubmit({ email, username, password });
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <label>
                Email:
                <input
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Никнейм:
                <input
                    type="text"
                    placeholder="Введите никнейм"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Пароль:
                <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Повторите пароль:
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
        </form>
    );
};

export default RegisterForm;
