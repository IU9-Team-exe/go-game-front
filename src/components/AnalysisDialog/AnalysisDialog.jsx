import React from 'react';
import styles from './AnalysisDialog.module.css';

export default function AnalysisDialog({analysis, onClose}) {
    const {rootInfo, moveInfos, ownership, policy, turnNumber} = analysis || {};

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.dialog} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✕</button>
                <h3>Анализ партии</h3>
                <div className={styles.content}>
                    <p><strong>Номер хода:</strong> {turnNumber}</p>
                    <p><strong>Текущий игрок:</strong> {rootInfo.currentPlayer}</p>

                    <h4>Информация о корне</h4>
                    <ul>
                        {rootInfo && Object.entries(rootInfo).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {String(value)}</li>
                        ))}
                    </ul>

                    <h4>Топ ходы</h4>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Порядок</th>
                            <th>Ход</th>
                            <th>Визиты</th>
                            <th>Winrate</th>
                            <th>ScoreLead</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moveInfos.map(mi => (
                            <tr key={mi.order}>
                                <td>{mi.order}</td>
                                <td>{mi.move}</td>
                                <td>{mi.visits}</td>
                                <td>{(mi.winrate * 100).toFixed(1)}%</td>
                                <td>{mi.scoreLead}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h4>Политика</h4>
                    <p>{policy.join(', ')}</p>

                    <h4>Владение</h4>
                    <p>{ownership.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}
