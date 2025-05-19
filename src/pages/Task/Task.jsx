import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GoPlayerTask from "../../components/GoPlayers/GoPlayerTask";
import { markTaskAsDone } from "../../services/API/tasksApi";
import styles from "./Task.module.css";

export default function TaskPage() {
    const { state } = useLocation();
    const { sgf, taskNumber, taskLevel, taskStatus } = state || {};

    const [done, setDone] = useState(taskStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!sgf) {
        return (
            <div className="main-container">
                <p>SGF задачи не указан. Перейдите сюда из списка задач.</p>
            </div>
        );
    }

    const handleCheckbox = async (e) => {
        const isChecked = e.target.checked;
        setLoading(true);
        setError(null);
        try {
            await markTaskAsDone(taskNumber);
            setDone(isChecked);
        } catch (err) {
            setError(
                err.response?.data?.Body?.ErrorDescription ||
                err.message ||
                "Не удалось отметить задачу."
            );
            // вернуть чекбокс в исходное состояние
            setDone(!isChecked);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={`main-container ${styles.container}`}>
                <h2 className={styles.title}>
                    Задача №{taskNumber} {taskLevel && ` (уровень ${taskLevel})`}
                </h2>
                <div className={styles.controls}>
                    <label className={styles.markDone}>
                        <input
                            type="checkbox"
                            disabled={loading || done}
                            checked={done}
                            onChange={handleCheckbox}
                        />{" "}
                        Отметить задачу выполненной
                    </label>
                    {loading && <span className={styles.status}>Сохраняем...</span>}
                    {done && !loading && (
                        <span className={styles.statusDone}>Задача отмечена!</span>
                    )}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </div>

            <GoPlayerTask sgf={sgf}/>
        </div>
    );
}
