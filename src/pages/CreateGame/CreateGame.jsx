import React, { useEffect } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";

function CreateGame() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleCreate = async () => {
        try {
            const response = await newGame();
            navigate(`/game/${response.data.Body.public_key}`);
        } catch (error) {
            console.error("Ошибка создания игры", error);
            navigate("/game");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Создать игру</h2>
            <button onClick={handleCreate} className={styles.createButton}>
                Создать игру
            </button>
        </div>
    );
}

export default CreateGame;
