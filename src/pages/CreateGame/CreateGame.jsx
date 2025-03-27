import React, { useState } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";

function CreateGame() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    const handleCreate = async () => {
        try {
            const response = await newGame(nickname);
            console.log(response.data);
            navigate(`/game/${response.data.Body.unique_key}`);
        } catch (error) {
            console.error("Ошибка создания игры", error);
            navigate("/game");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Создать игру</h2>
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Введите ник"
                className={styles.inputField}
            />
            <button onClick={handleCreate} className={styles.createButton}>
                Создать игру
            </button>
        </div>
    );
}

export default CreateGame;
