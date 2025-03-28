import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const AuthForm = ({ onSubmit, error, isLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2>Авторизация</h2>
            <label>
                Username:
                <input
                    type="Username"
                    placeholder="Введите username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Пароль:
                <input
                    type="Password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Войти"}
            </button>
        </form>
    );
};

export default AuthForm;
