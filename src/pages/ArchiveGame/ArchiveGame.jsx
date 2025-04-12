import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";

const ArchiveGame = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    setGameInfo(game);
                    setSgf(game.Sgf || "(;FF[4]GM[1]SZ[19])");
                } else {
                    setError("Ошибка при получении данных игры.");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить информацию об игре.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [gameId]);

    if (isLoading) {
        return <div className={styles.loading}>Загрузка игры...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={`${styles.container} main-container`}>
            <h2 className={styles.title}>Архивная партия</h2>
            {gameInfo && (
                <div className={styles.gameDetails}>
                    <p>
                        <strong>Игроки:</strong> {gameInfo.BlackPlayer} vs {gameInfo.WhitePlayer}
                    </p>
                    <p>
                        <strong>Дата:</strong> {new Date(gameInfo.Date).toLocaleDateString("ru-RU")}
                    </p>
                    {gameInfo.Event && (
                        <p>
                            <strong>Событие:</strong> {gameInfo.Event}
                        </p>
                    )}
                </div>
            )}
            <div className={styles.playerContainer}>
                <GoPlayerArchive sgf={sgf} />
            </div>
        </div>
    );
};

export default ArchiveGame;
