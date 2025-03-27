import React, { useState } from "react";
import { joinGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./JoinGame.module.css";

function JoinGame() {
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    const handleJoin = async () => {
        try {
            const response = await joinGame(gameCode, nickname);
            console.log(response);
            navigate(`/game/${gameCode}`);
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
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Введите ник"
                className={styles.inputField}
            />

            <button onClick={handleJoin} className={styles.joinButton}>
                Подключиться
            </button>
        </div>
    );
}

export default JoinGame;
