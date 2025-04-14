import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";
import AICharacterExplanation from "../../components/AICharacterExplanation/AICharacterExplanation";

const ArchiveGame = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentMoveNumber, setCurrentMoveNumber] = useState(0); // Initialize to 0
    const [aiExplanation, setAiExplanation] = useState(null);
    const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);
    const [explanationError, setExplanationError] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false); // Renamed state
    const [explanationMode, setExplanationMode] = useState('dialog'); // 'dialog' or 'character'
    const [characterType, setCharacterType] = useState('chillGuy'); // 'chillGuy' or 'animeGirl'

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setGameInfo(null);
        setSgf("(;FF[4]GM[1]SZ[19])");
        setCurrentMoveNumber(0);
        setShowExplanation(false); // Reset explanation visibility

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
            setShowExplanation(false); // Hide explanation on move change
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

        const requestUrl = `http://localhost:8080/api/getMoveExplanation`;

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    game_archive_id: gameId,
                    move_seq_number: currentMoveNumber
                })
            });

            if (!response.ok) {
                 let errorMsg = `HTTP error! status: ${response.status}`;
                 try {
                    const errorBody = await response.json();
                    errorMsg = errorBody?.Body?.ErrorDescription || errorMsg;
                 } catch (parseError) { console.warn("Could not parse error response body:", parseError); }
                 if (response.status === 0 || response.type === 'opaque' || response.type === 'error') {
                     errorMsg = "Network error or CORS issue. Check console and backend CORS configuration.";
                 }
                 throw new Error(errorMsg);
            }

            const data = await response.json();

            if (data?.Status === 200 && data?.Body?.llm_response) {
                setAiExplanation(data.Body.llm_response);
                setShowExplanation(true); // Show explanation UI
            } else {
                throw new Error(data?.Body?.ErrorDescription || "Не удалось получить объяснение хода от сервера.");
            }
        } catch (err) {
            console.error("Ошибка при запросе объяснения хода:", err);
             setExplanationError(`Ошибка: ${err.message || "Не удалось связаться с сервером."}. Проверьте консоль для деталей.`);
            setShowExplanation(true); // Show explanation UI (to display error)
        } finally {
            setIsFetchingExplanation(false);
        }
    };

    const closeExplanation = () => {
        setShowExplanation(false);
    }

    if (isLoading) {
        return <div className={styles.loading}>Загрузка игры...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!gameInfo) {
        return <div className={styles.loading}>Загрузка информации об игре...</div>;
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
                <GoPlayerArchive key={sgf} sgf={sgf} onMoveChange={handleMoveChange} />
            </div>

             {/* Settings/Controls Area */}
             <div className={styles.controlsArea}>
                 {/* Explanation Button */}
                 {currentMoveNumber > 0 && (
                     <button
                         onClick={handleGetExplanation}
                         disabled={isFetchingExplanation}
                         className={styles.explanationButton}
                     >
                         {isFetchingExplanation ? "Запрос ИИ..." : `Объяснить ход #${currentMoveNumber}`}
                     </button>
                 )}

                 {/* Explanation Mode Toggle */}
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

                 {/* Character Type Selector (only if mode is character) */}
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


            {/* Conditional Explanation Display */}
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
        </div>
    );
};

export default ArchiveGame;