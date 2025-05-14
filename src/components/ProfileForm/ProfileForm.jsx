import React, { useState, useEffect } from "react";
import styles from "../AuthForm/AuthForm.module.css";

const ProfileForm = ({ initialData = {}, onSave, isLoading }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        PasswordHash: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.Username || initialData.username || "",
                email: initialData.Email || initialData.email || "",
                PasswordHash: initialData.PasswordHash || initialData.PasswordHash || "",
            });
        }
        console.log(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        onSave?.(formData, setError);
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Профиль</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        readOnly
                        disabled
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Введите email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        name="PasswordHash"
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        value={formData.PasswordHash}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                        />
                        Показать пароль
                    </label>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;