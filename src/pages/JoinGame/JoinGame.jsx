import React, {useEffect, useState} from "react";
import {joinGame, leaveGame} from "../../services/API/gameApi";
import {useNavigate} from "react-router-dom";
import styles from "./JoinGame.module.css";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {GameProvider, useGame} from "../../contexts/GameContext";

function JoinGameContent() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const {user} = useAuth();
    const {setPlayerColor, updateGameKey} = useGame();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError("Введите код игры.");
            return;
        }
        setIsLoading(true);
        try {
            await joinGame(code);
            setPlayerColor("w");
            updateGameKey(code);
            navigate(`/game/${code}`);
        } catch (error) {
            if (error.response?.status === 409) {
                const gameKey = error.response.data?.Body?.currGameKey;
                if (gameKey) {
                    await leaveGame(gameKey);
                    await joinGame(code);
                    setPlayerColor("w");
                    updateGameKey(code);
                    navigate(`/game/${code}`);
                }
            } else {
                setError(error.response?.data?.Body?.ErrorDescription || error.message);
                setIsLoading(false);
            }
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
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
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