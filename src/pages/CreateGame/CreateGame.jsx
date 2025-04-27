import React, { useEffect, useState } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useGame } from "../../contexts/GameContext"; // Импортируем useGame

function CreateGame() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setPlayerColor } = useGame(); // Получаем setPlayerColor
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleCreate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await newGame(); // Параметры по умолчанию на бэке
            const gameKey = response.data?.Body?.public_key || response.data?.Body?.currGameKey;
            if (gameKey) {
                setPlayerColor("b"); // Создатель всегда начинает за черных
                navigate(`/game/${gameKey}`);
            } else {
                throw new Error("Не удалось получить ключ игры от сервера.");
            }
        } catch (err) {
            console.error("Ошибка создания игры", err);
            setError(err.response?.data?.Body?.ErrorDescription || err.message || "Не удалось создать игру. Попробуйте снова.");
            setIsLoading(false);
            // Не перенаправляем при ошибке
        }
        // Не нужно setIsLoading(false) при успехе, т.к. происходит редирект
    };

    return (
        <div className={`${styles.container} main-container`}> {/* Добавлен main-container */}
            <h2>Создать новую игру Го</h2>
            <p className={styles.description}>
                Нажмите кнопку ниже, чтобы создать новую игровую комнату.
                Вы будете играть за чёрных.
            </p>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handleCreate} className={styles.createButton} disabled={isLoading}>
                {isLoading ? "Создание..." : "Создать игру"}
            </button>
        </div>
    );
}

export default CreateGame;