import React from "react";
import { useLocation } from "react-router-dom";
import GoPlayerTask from "../../components/GoPlayers/GoPlayerTask";
import styles from "./Task.module.css";

export default function TaskPage() {
    const { state } = useLocation();
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
                <h2 className={styles.title}>
                    Задача №{taskNumber} {taskLevel && ` (уровень ${taskLevel})`}
                </h2>
            </div>
            <GoPlayerTask sgf={sgf} />
        </div>

    );
}
