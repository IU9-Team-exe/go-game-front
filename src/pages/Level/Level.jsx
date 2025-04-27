import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {getAvailableGamesForUser} from "../../services/API/tasksApi";
import styles from "./Level.module.css";

const Level = () => {
    const {level} = useParams();
    const {user} = useAuth();
    const userID = user.id;
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAvailableGamesForUser(page, userID, level)
            .then((response) => {
                const body = response.data.Body;
                setTasks(body.tasks || []);
                setTotalPages(body.total_pages || 1);
            })
            .catch((err) => {
                setError(
                    err.response?.data?.Body?.ErrorDescription ||
                    err.message ||
                    "Ошибка загрузки задач"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, level, userID]);

    return (
        <div className={`main-container ${styles.container}`}>
            <h2>Задачи уровня {level}</h2>

            {loading && <p>Загрузка задач...</p>}
            {error && <p className={styles.error}>Ошибка: {error}</p>}
            {!loading && tasks.length === 0 && <p>Задачи не найдены.</p>}

            {!loading && tasks.length > 0 && (
                <div className={styles.tasksList}>
                    {tasks.map((task) => (
                        <div
                            key={task.task_number}
                            className={styles.taskCard}
                            onClick={() =>
                                navigate(`/task/${task.task_number}`, {
                                    state: {
                                        sgf: task.task_sgf,
                                        taskNumber: task.task_number,
                                        taskLevel: level
                                    }
                                })
                            }
                            style={{cursor: "pointer"}}
                        >
                            <p>
                                <strong>Задача #{task.task_number}</strong>
                            </p>
                            <p>Уровень: {task.task_level}</p>
                            <p>Статус: {task.task_status}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Предыдущая
                </button>
                <span>
          Страница {page} из {totalPages}
        </span>
                <button
                    onClick={() =>
                        setPage((old) => (old < totalPages ? old + 1 : old))
                    }
                    disabled={page === totalPages}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default Level;