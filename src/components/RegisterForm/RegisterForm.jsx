import React, { useState } from "react";
// Используем стили от AuthForm для единообразия
import styles from "../AuthForm/AuthForm.module.css";

const RegisterForm = ({ onSubmit, error, isLoading }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordError, setPasswordError] = useState(""); // Состояние для ошибки паролей

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError(""); // Сброс ошибки паролей
        if (password !== confirm) {
            setPasswordError("Пароли не совпадают"); // Установка ошибки
            return;
        }
        onSubmit({ email, username, password });
    };

    return (
        // Используем тот же контейнер, что и в AuthForm для центрирования
        <div className={styles.formContainer}>
            {/* Используем класс .authForm для стилизации самой формы */}
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm">Повторите пароль:</label>
                    <input
                        id="confirm"
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                {/* Отображаем ошибки */}
                {passwordError && <p className={styles.error}>{passwordError}</p>}
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;