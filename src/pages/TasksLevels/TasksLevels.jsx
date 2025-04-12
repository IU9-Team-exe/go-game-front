import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TasksLevels.module.css";

const TasksLevels = () => {
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);
    const navigate = useNavigate();

    const handleClick = (level) => {
        navigate(`/tasks/level/${level}`);
    };

    return (
        <div className={`main-container ${styles.container}`}>
            <h2>Выберите уровень задач</h2>
            <div className={styles.levelsList}>
                {levels.map((level) => (
                    <div key={level} className={styles.levelItem}>
                        <button
                            className={styles.levelButton}
                            onClick={() => handleClick(level)}
                        >
                            Уровень {level}
                        </button>
                        <span className={styles.taskInfo}>1000 задач</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksLevels;
