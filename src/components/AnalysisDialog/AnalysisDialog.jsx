// src/components/AnalysisDialog/AnalysisDialog.jsx
import React from "react";
import styles from "./AnalysisDialog.module.css";

export default function AnalysisDialog({analysis, onClose}) {
    // Если анализ ещё не пришёл или в нём нет Body — не рендерим ничего
    if (!analysis || !analysis.Body) return null;

    const {
        moveInfos = [],
        rootInfo = {},
        turnNumber = "-"
    } = analysis.Body;

    const {
        currentPlayer = "-",
        scoreLead = 0,
        winrate = 0
    } = rootInfo;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✕</button>
                <h3>Анализ игры</h3>
                <div className={styles.summary}>
                    <p><strong>Номер хода:</strong> {turnNumber}</p>
                    <p>
                        <strong>Ходит:</strong> {currentPlayer === "B" ? "Чёрные" : currentPlayer === "W" ? "Белые" : currentPlayer}
                    </p>
                    <p><strong>Перевес:</strong> {scoreLead.toFixed(1)}</p>
                    <p><strong>Шанс победы:</strong> {(winrate * 100).toFixed(1)}%</p>
                </div>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ход</th>
                        <th>Win%</th>
                        <th>PV</th>
                    </tr>
                    </thead>
                    <tbody>
                    {moveInfos.map((info, idx) => (
                        <tr key={info.order}>
                            <td>{idx + 1}</td>
                            <td>{info.move}</td>
                            <td>{(info.winrate * 100).toFixed(1)}%</td>
                            <td>{info.pv?.join(" → ")}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
