import React, { useEffect, useState } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useGame } from "../../contexts/GameContext";

function CreateGame() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setPlayerColor, updateGameKey } = useGame();
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
            const response = await newGame();
            const key = response.data.Body?.public_key || response.data.Body?.currGameKey;
            if (key) {
                setPlayerColor("b");
                updateGameKey(key);
                navigate(`/game/${key}`);
            } else {
                setError(response.data?.Body?.error || "Не удалось создать игру. Попробуйте снова.");
            }
        } catch (error) {
            if (error.response?.status === 409) {
                const gameKey = error.response.data?.Body?.currGameKey;
                if (gameKey) {
                    setPlayerColor("b");
                    navigate(`/game/${gameKey}`);
                } else {
                    setError("Вы уже находитесь в игре, но не удалось получить её ключ.");
                }
            } else {
                setError(error.response?.data?.Body?.error || "Неизвестная ошибка. Попробуйте снова.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.container} main-container`}>
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