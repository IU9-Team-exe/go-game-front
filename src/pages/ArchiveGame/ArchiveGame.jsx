import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getGameFromArchiveById} from "../../services/API/archiveApi";
import {analyseCurrent, getMoveExplanation} from "../../services/API/gameApi.js";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";
import AICharacterExplanation from "../../components/AICharacterExplanation/AICharacterExplanation";
import AnalysisDialog from "../../components/AnalysisDialog/AnalysisDialog.jsx";

const ArchiveGame = () => {
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentMoveNumber, setCurrentMoveNumber] = useState(0);
    const [aiExplanation, setAiExplanation] = useState(null);
    const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);
    const [explanationError, setExplanationError] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanationMode, setExplanationMode] = useState('dialog');
    const [characterType, setCharacterType] = useState('chillGuy');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setGameInfo(null);
        setSgf("(;FF[4]GM[1]SZ[19])");
        setCurrentMoveNumber(0);
        setShowExplanation(false);

        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    setGameInfo(game);
                    setSgf(game.Sgf && game.Sgf.trim().startsWith('(;') ? game.Sgf : "(;FF[4]GM[1]SZ[19])");
                } else {
                    setError("Ошибка при получении данных игры.");
                }
            })
            .catch((err) => {
                console.error("Error fetching game details:", err);
                setError("Не удалось загрузить информацию об игре.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [gameId]);

    const handleMoveChange = (moveNum) => {
        if (typeof moveNum === 'number' && !isNaN(moveNum)) {
            setCurrentMoveNumber(moveNum);
            setAiExplanation(null);
            setExplanationError(null);
            setShowExplanation(false);
        }
    };

    const handleGetExplanation = async () => {
        if (!gameId || currentMoveNumber <= 0) {
            console.warn("Cannot get explanation for gameId:", gameId, "and move:", currentMoveNumber);
            return;
        }

        setIsFetchingExplanation(true);
        setExplanationError(null);
        setAiExplanation(null);
        setShowExplanation(false);

        try {
            const data = await getMoveExplanation(gameId, currentMoveNumber);

            if (data?.Status === 200 && data?.Body?.llm_response) {
                setAiExplanation(data.Body.llm_response);
                setShowExplanation(true);
            } else {
                throw new Error(data?.Body?.ErrorDescription || "Не удалось получить объяснение хода от сервера.");
            }
        } catch (err) {
            console.error("Ошибка при запросе объяснения хода:", err);
            setExplanationError(`Ошибка: ${err.message || "Не удалось связаться с сервером."}. Проверьте консоль для деталей.`);
            setShowExplanation(true);
        } finally {
            setIsFetchingExplanation(false);
        }
    };

    const closeExplanation = () => {
        setShowExplanation(false);
    }

    const handleAnalyse = async () => {
        setIsAnalysing(true);
        try {
            const resp = await analyseCurrent(gameId);
            const status = resp.data.Status;
            if (status === 200) {
                setAnalysis(resp.data);
                setIsAnalysisOpen(true);
            }
        } catch (e) {
            console.error("Ошибка анализа игры:", e);
        } finally {
            setIsAnalysing(false);
        }
    };

    const closeAnalyse = () => {
        setIsAnalysisOpen(false);
        setAnalysis(null);
    };


    if (isLoading) return <div className={styles.loading}>Загрузка игры...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!gameInfo) return <div className={styles.loading}>Загрузка информации об игре...</div>;

    return (
        <div className={`${styles.container} main-container`}>
            <h2 className={styles.title}>Архивная партия</h2>
            <div className={styles.gameDetails}>
                <p><strong>Игроки:</strong> {gameInfo.BlackPlayer} vs {gameInfo.WhitePlayer}</p>
            </div>

            <div className={styles.playerContainer}>
                <GoPlayerArchive key={sgf} sgf={sgf} onMoveChange={handleMoveChange}/>
            </div>

            <div className={styles.controlsArea}>
                <div className={styles.modeToggle}>
                    <span className={styles.toggleLabel}>Вид объяснения:</span>
                    <button
                        onClick={() => setExplanationMode('dialog')}
                        className={`${styles.toggleButton} ${explanationMode === 'dialog' ? styles.activeToggle : ''}`}
                    >
                        Окно
                    </button>
                    <button
                        onClick={() => setExplanationMode('character')}
                        className={`${styles.toggleButton} ${explanationMode === 'character' ? styles.activeToggle : ''}`}
                    >
                        Персонаж
                    </button>
                </div>

                {explanationMode === 'character' && (
                    <div className={styles.characterSelector}>
                        <span className={styles.toggleLabel}>Персонаж:</span>
                        <button
                            onClick={() => setCharacterType('chillGuy')}
                            className={`${styles.toggleButton} ${characterType === 'chillGuy' ? styles.activeToggle : ''}`}
                        >
                            Chill Guy
                        </button>
                        <button
                            onClick={() => setCharacterType('animeGirl')}
                            className={`${styles.toggleButton} ${characterType === 'animeGirl' ? styles.activeToggle : ''}`}
                        >
                            Anime Девушка
                        </button>
                    </div>
                )}
            </div>

            {/* --- КНОПКА ОБЪЯСНЕНИЯ ОТДЕЛЬНО --- */}
            {currentMoveNumber > 0 && (
                <div className={styles.fixedButtonContainer}>
                    <button
                        onClick={handleGetExplanation}
                        disabled={isFetchingExplanation}
                        className={styles.explanationButton}
                    >
                        {isFetchingExplanation
                            ? "Запрос ИИ..."
                            : `Объяснить ход #${currentMoveNumber}`}
                    </button>

                    <button
                        onClick={handleAnalyse}
                        disabled={isAnalysing}
                        className={styles.explanationButton}
                    >
                        {isAnalysing ? "Анализ..." : "Анализ игры"}
                    </button>
                </div>
            )}

            {/* ОТОБРАЖЕНИЕ ОБЪЯСНЕНИЯ */}
            {showExplanation && explanationMode === 'dialog' && (
                <div className={styles.explanationDialogOverlay} onClick={closeExplanation}>
                    <div className={styles.explanationDialog} onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeExplanation} className={styles.closeButton}>✕</button>
                        <h3>Объяснение хода #{currentMoveNumber} от ИИ</h3>
                        {explanationError && <p className={styles.errorText}>{explanationError}</p>}
                        {aiExplanation && <p className={styles.explanationText}>{aiExplanation}</p>}
                        {!explanationError && !aiExplanation && isFetchingExplanation && <p>Загрузка...</p>}
                    </div>
                </div>
            )}

            {showExplanation && explanationMode === 'character' && (
                <AICharacterExplanation
                    explanation={aiExplanation}
                    error={explanationError}
                    characterType={characterType}
                    onClose={closeExplanation}
                />
            )}

            {isAnalysisOpen && (
                <AnalysisDialog
                    analysis={analysis}
                    onClose={closeAnalyse}
                />
            )}
        </div>
    );
};

export default ArchiveGame;
