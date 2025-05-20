import React, {useState, useEffect} from "react";
import authStyles from "../AuthForm/AuthForm.module.css";
import styles from "./ProfileForm.module.css";

const ProfileForm = ({initialData = {}, onSave, isLoading}) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        statistic: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.Username || initialData.username || "",
                email: initialData.email || "",
                statistic: initialData.statistic || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        onSave?.(formData, setError);
    };

    return (
        <div className={authStyles.formContainer}>
            <form className={authStyles.authForm} onSubmit={handleSubmit}>
                <h2>Профиль</h2>

                {formData.statistic && (
                    <div className={styles.statsContainer}>
                        <div className={styles.statItem}>
              <span className={styles.statValue}>
                {formData.statistic.wins}
              </span>
                            <span className={styles.statLabel}>Победы</span>
                        </div>
                        <div className={styles.statItem}>
              <span className={styles.statValue}>
                {formData.statistic.losses}
              </span>
                            <span className={styles.statLabel}>Поражения</span>
                        </div>
                        <div className={styles.statItem}>
              <span className={styles.statValue}>
                {formData.statistic.draws}
              </span>
                            <span className={styles.statLabel}>Ничьи</span>
                        </div>
                    </div>
                )}

                <div className={authStyles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={authStyles.inputGroup}>
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

                {error && <p className={authStyles.error}>{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={authStyles.submitButton}
                >
                    {isLoading ? "Сохранение…" : "Сохранить"}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;