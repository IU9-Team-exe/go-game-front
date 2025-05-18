import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "./TasksLevels.module.css";

const TasksLevels = () => {
    const navigate = useNavigate();

    const descriptions = [
        "Основы: простые ходы",
        "Базовые тактики захватов",
        "Комбинации на 3–4 хода",
        "Шаблоны жизни и смерти",
        "Анализ на 5–6 ходов",
        "Углублённый анализ",
        "Стратегия и влияние",
        "Сложные tesuji",
        "Мастерские ловушки",
        "Профессиональные задачи"
    ];

    const handleClick = (level) => {
        navigate(`/tasks/level/${level}`);
    };

    return (
        <div className={`main-container ${styles.container}`}>
            <h2>Выберите уровень задач</h2>
            <div className={styles.levelsList}>
                {descriptions.map((text, idx) => {
                    const level = idx + 1;
                    return (
                        <div key={level} className={styles.levelItem}>
                            <button
                                className={styles.levelButton}
                                onClick={() => handleClick(level)}
                            >
                                Уровень {level}
                            </button>
                            <span className={styles.taskInfo}>
                                {text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TasksLevels;
