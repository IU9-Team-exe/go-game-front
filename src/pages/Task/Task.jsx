import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoPlayerTask from "../../components/GoPlayers/GoPlayerTask";
import styles from "./Task.module.css";

export default function TaskPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { sgf, taskNumber, taskLevel } = state || {};

    if (!sgf) {
        return (
            <div className="main-container">
                <p>SGF задачи не указан. Перейдите сюда из списка задач.</p>
            </div>
        );
    }

    return (
        <div>
            <div className={`main-container ${styles.container}`}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ← Назад
                </button>
                <h2 className={styles.title}>
                    Задача #{taskNumber} {taskLevel && ` (уровень ${taskLevel})`}
                </h2>
            </div>
            <GoPlayerTask sgf={sgf} />
        </div>

    );
}
