import React from "react";
import styles from "./ArchiveGameCard.module.css";
import { convertCoords } from "../../utils/conversionUtils"; // Для отображения хода, если нужно

function ArchiveGameCard({ game }) {
    const {
        black_name, // Используем snake_case из API
        black_rank,
        white_name,
        white_rank,
        datetime, // Используем datetime
        result,
        event,
        board_size,
        komi,
        // moves, // moves не всегда приходят, sgf надежнее
        sgf_link // Используем sgf_link
    } = game;

    // Форматирование результата
    const formatResult = (res) => {
        if (!res || !res.win_color) return "N/A"; // Нет результата
        const winner = res.win_color === "B" ? "Чёрные" : "Белые";
        if (res.reason === "resign") return `${winner} (сдача)`;
        if (res.reason === "time") return `${winner} (время)`;
        if (res.reason === "score" && res.point_diff != null) return `${winner} +${res.point_diff}`;
        if (res.point_diff != null) return `${winner} +${res.point_diff}`; // Если причина не указана, но есть очки
        return winner; // Если только цвет победителя
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("ru-RU");
        } catch (e) {
            return dateString; // Возвращаем как есть, если не дата
        }
    };

    return (
        <div className={styles.gameCard}>
            <div className={styles.eventDate}>
                <span className={styles.event}>{event || "Неизвестное событие"}</span>
                <span className={styles.date}>{formatDate(datetime)}</span>
            </div>

            <div className={styles.players}>
                <div className={styles.playerInfo}>
                    <span className={`${styles.stone} ${styles.blackStone}`}></span>
                    <span className={styles.playerName}>{black_name || "Игрок"}</span>
                    <span className={styles.playerRank}>({black_rank || "?"})</span>
                </div>
                <div className={styles.vs}>vs</div>
                <div className={styles.playerInfo}>
                     <span className={`${styles.stone} ${styles.whiteStone}`}></span>
                    <span className={styles.playerName}>{white_name || "Игрок"}</span>
                    <span className={styles.playerRank}>({white_rank || "?"})</span>
                </div>
            </div>

            <div className={styles.details}>
                <span>Доска: {board_size || 19}x{board_size || 19}</span>
                <span>Коми: {komi != null ? komi : "N/A"}</span>
            </div>

            <div className={styles.result}>
                <strong>Результат:</strong> {formatResult(result)}
            </div>

            {sgf_link && (
                <a href={sgf_link} target="_blank" rel="noopener noreferrer" className={styles.sgfLink}>
                    Скачать SGF
                </a>
            )}
        </div>
    );
}

export default ArchiveGameCard;