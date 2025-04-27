import React, {useEffect, useState} from "react";
import {joinGame, leaveGame} from "../../services/API/gameApi";
import {useNavigate} from "react-router-dom";
import styles from "./JoinGame.module.css";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {GameProvider, useGame} from "../../contexts/GameContext";

function JoinGameContent() {
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const {user} = useAuth();
    const {setPlayerColor} = useGame();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleJoin = async (e) => {
        e.preventDefault(); // Предотвращаем стандартную отправку формы
        if (!gameCode.trim()) {
            setError("Введите код игры.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await joinGame(gameCode);
            const oldGameCode = response.data?.Body?.currGameKey;
            if (oldGameCode) {
                await leaveGame(gameCode);
            }
            setPlayerColor("w");
            navigate(`/game/${gameCode}`);
        } catch (err) {
            console.error("Ошибка подключения к игре", err);
            setError(err.response?.data?.Body?.ErrorDescription || err.message || "Не удалось подключиться к игре. Проверьте код или попробуйте позже.");
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.container} main-container`}> {/* Добавлен main-container */}
            <h2>Подключиться к игре</h2>
            <p className={styles.description}>
                Введите код игры, полученный от другого игрока, чтобы присоединиться.
                Вы будете играть за белых.
            </p>
            <form onSubmit={handleJoin} className={styles.joinForm}>
                <input
                    type="text"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    placeholder="Код игры"
                    className={styles.inputField}
                    required
                    disabled={isLoading}
                />
                <button type="submit" className={styles.joinButton} disabled={isLoading}>
                    {isLoading ? "Подключение..." : "Подключиться"}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

function JoinGame() {
    return (
        <GameProvider>
            <JoinGameContent/>
        </GameProvider>
    );
}

export default JoinGame;