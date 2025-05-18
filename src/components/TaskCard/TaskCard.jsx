import React from "react";
import { useNavigate } from "react-router-dom";
import GoPlayerTaskPreview from "../GoPlayers/GoPlayerTaskPreview";
import styles from "./TaskCard.module.css";


const TaskCard = ({ task, level }) => {
    const navigate = useNavigate();

    const handleClick = () =>
        navigate(`/task/${task.task_number}`, {
            state: {
                sgf: task.task_sgf,
                taskNumber: task.task_number,
                taskLevel: level,
            },
        });

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.preview}>
                <GoPlayerTaskPreview sgf={task.task_sgf} />
            </div>

            <div className={styles.info}>
                <div className={styles.title}>Задача №{task.task_number}</div>
                <div className={`${styles.detail} ${styles.status}`}>
                    Статус: {task.task_status === 'not_done' ? '🕗' : '✓'}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
