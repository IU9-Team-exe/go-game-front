import React from "react";
import styles from "./TasksLevels.module.css";

const TasksLevels = () => {
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <div className={`main-container ${styles.container}`}>
            <h2>Выберите уровень задач</h2>
            <div className={styles.levelsList}>
                {levels.map((level) => (
                    <div key={level} className={styles.levelItem}>
                        <button className={styles.levelButton}>Уровень {level}</button>
                        <span className={styles.taskInfo}>1000 задач</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksLevels;
