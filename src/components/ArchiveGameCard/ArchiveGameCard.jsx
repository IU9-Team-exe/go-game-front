import React from "react";
import styles from "./ArchiveGameCard.module.css";

function ArchiveGameCard({ game }) {
    const {
        blackPlayer,
        blackRank,
        whitePlayer,
        whiteRank,
        date,
        result,
        event,
        boardSize,
        komi,
        moves,
        sgf
    } = game;

    return (
        <div className={styles.gameCard}>
            <div className={styles.players}>
                <div>
                    <strong>Чёрные:</strong> {blackPlayer} ({blackRank})
                </div>
                <div>
                    <strong>Белые:</strong> {whitePlayer} ({whiteRank})
                </div>
            </div>
            <div className={styles.info}>
                <div>
                    <strong>Событие:</strong> {event}
                </div>
                <div>
                    <strong>Дата:</strong> {date}
                </div>
                <div>
                    <strong>Размер доски:</strong> {boardSize}
                </div>
                <div>
                    <strong>Коми:</strong> {komi}
                </div>
            </div>
            <div className={styles.result}>
                <strong>Результат:</strong>{" "}
                {result?.winColor === "B" ? "Чёрные" : "Белые"} +
                {result?.pointDiff} очков
            </div>

            {sgf && (
                <a href={sgf} target="_blank" rel="noreferrer">
                    Скачать SGF
                </a>
            )}

        </div>
    );
}

export default ArchiveGameCard;
