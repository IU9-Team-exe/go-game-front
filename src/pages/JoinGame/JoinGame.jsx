import React, {useEffect, useState} from "react";
import { joinGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./JoinGame.module.css";
import {useAuth} from "../../contexts/AuthContext.jsx";

function JoinGame() {
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleJoin = async () => {
        try {
            await joinGame(gameCode, user.username);
            navigate(`/game/${gameCode}`, { state: { playerColor: "w", playerId: user.username } });
        } catch (error) {
            console.error("Ошибка подключения к игре", error);
            navigate(`/game}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Подключиться к игре</h2>
            <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Введите код"
                className={styles.inputField}
            />

            <button onClick={handleJoin} className={styles.joinButton}>
                Подключиться
            </button>
        </div>
    );
}

export default JoinGame;
