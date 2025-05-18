import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAvailableGamesForUser } from "../../services/API/tasksApi";
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./Level.module.css";

const Level = () => {
    const { level } = useParams();
    const { user } = useAuth();
    const userID = user.id;

    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page") || "1", 10);

    const [page, setPage] = useState(pageParam);
    const [tasks, setTasks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (pageParam !== page) {
            setPage(pageParam);
        }
    }, [pageParam]);

    useEffect(() => {
        setSearchParams({ page: page.toString() });
    }, [page]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAvailableGamesForUser(page, userID, level)
            .then((resp) => {
                const body = resp.data.Body;
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
            .finally(() => setLoading(false));
    }, [page, level, userID]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    return (
        <div className={`main-container ${styles.container}`}>
            <h2>Задачи уровня {level}</h2>

            {loading && <p>Загрузка задач…</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && tasks.length === 0 && <p>Задачи не найдены.</p>}

            {!loading && tasks.length > 0 && (
                <div className={styles.tasksGrid}>
                    {tasks.map((t) => (
                        <TaskCard key={t.task_number} task={t} level={level} />
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                <button onClick={handlePrev} disabled={page === 1}>
                    Предыдущая
                </button>
                <span>
          Страница {page} из {totalPages}
        </span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default Level;