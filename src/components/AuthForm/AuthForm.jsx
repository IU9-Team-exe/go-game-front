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
        // Добавляем класс для фона и центрирования
        <div className={styles.formContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Авторизация</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="Username" // Оставляем тип для совместимости, если он где-то используется
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="Password" // Оставляем тип для совместимости
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Вход..." : "Войти"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;