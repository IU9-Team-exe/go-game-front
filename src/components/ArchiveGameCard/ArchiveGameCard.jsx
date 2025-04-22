import React from "react";
import {Link} from "react-router-dom";
import styles from "./ArchiveGameCard.module.css";

function ArchiveGameCard({game}) {
    const {
        game_id,
        BlackPlayer,
        BlackRank,
        WhitePlayer,
        WhiteRank,
        Date,
        Result,
        Event,
        BoardSize,
        Komi,
        Sgf
    } = game;

    const formatResult = (res) => {
        if (!res || !res.WinColor) return "N/A";
        const winner = res.WinColor === "B" ? "Чёрные" : res.WinColor === "W" ? "Белые" : "Ничья";
        if (res.Reason === "resign") return `${winner} (сдача)`;
        if (res.Reason === "time") return `${winner} (время)`;
        if (res.Reason === "score" && res.PointDiff != null) return `${winner} +${res.PointDiff}`;
        if (res.PointDiff != null) return `${winner} +${res.PointDiff}`;
        return winner;
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("ru-RU");
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className={styles.gameCard}>
            <div className={styles.eventDate}>
                <span className={styles.event}>{Event || "Неизвестное событие"}</span>
                <span className={styles.date}>{formatDate(Date)}</span>
            </div>

            <div className={styles.players}>
                <div className={styles.playerInfo}>
                    <span className={`${styles.stone} ${styles.blackStone}`}></span>
                    <span className={styles.playerName}>{BlackPlayer || "Игрок"}</span>
                    <span className={styles.playerRank}>({BlackRank || "?"})</span>
                </div>
                <div className={styles.vs}>vs</div>
                <div className={styles.playerInfo}>
                    <span className={`${styles.stone} ${styles.whiteStone}`}></span>
                    <span className={styles.playerName}>{WhitePlayer || "Игрок"}</span>
                    <span className={styles.playerRank}>({WhiteRank || "?"})</span>
                </div>
            </div>

            <div className={styles.details}>
                <span>Доска: {BoardSize || 19}x{BoardSize || 19}</span>
                <span>Коми: {Komi != null ? Komi : "N/A"}</span>
            </div>

            <div className={styles.result}>
                <strong>Результат:</strong> {formatResult(Result)}
            </div>

            {Sgf && (
                <>
                    <a
                        href={Sgf}
                        download="sgf.txt"
                        className={styles.sgfLink}
                        title="Скачать SGF"
                    >
                        Скачать SGF
                    </a>
                    <Link
                        to={`/archive/game/${game_id}`}
                        className={styles.viewGameButton}
                        title="Посмотреть партию"
                    >
                        Посмотреть партию
                    </Link>
                </>
            )}
        </div>
    );
}

export default ArchiveGameCard;
