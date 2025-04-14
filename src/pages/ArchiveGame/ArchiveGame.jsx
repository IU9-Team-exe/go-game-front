// src/pages/ArchiveGame/ArchiveGame.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";
import AICharacterExplanation from "../../components/AICharacterExplanation/AICharacterExplanation";

const ArchiveGame = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState(null); // Start with null
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentMoveNumber, setCurrentMoveNumber] = useState(0);
    const [aiExplanation, setAiExplanation] = useState(null);
    const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);
    const [explanationError, setExplanationError] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanationMode, setExplanationMode] = useState('dialog');
    const [characterType, setCharacterType] = useState('chillGuy');

    // --- Загрузка данных об игре ---
    useEffect(() => {
        setIsLoading(true);
        setError(null); setGameInfo(null); setSgf(null); // Reset state
        setCurrentMoveNumber(0); setShowExplanation(false);

        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    setGameInfo(game);
                    // Устанавливаем SGF только если он валидный
                    setSgf(game.Sgf && game.Sgf.trim().startsWith('(;') ? game.Sgf : "(;FF[4]GM[1]SZ[19])");
                } else { setError("Ошибка при получении данных игры."); }
            })
            .catch((err) => { console.error("Error fetching game details:", err); setError("Не удалось загрузить информацию об игре."); })
            .finally(() => { setIsLoading(false); });
    }, [gameId]);

    // --- Обработчики ---
    const handleMoveChange = (moveNum) => { // Обновление номера хода от плеера
        if (typeof moveNum === 'number' && !isNaN(moveNum)) {
            setCurrentMoveNumber(moveNum);
            setAiExplanation(null); setExplanationError(null); setShowExplanation(false);
        }
    };

    const handleGetExplanation = async () => { // Запрос объяснения
        if (!gameId || currentMoveNumber <= 0) return;
        setIsFetchingExplanation(true); setExplanationError(null); setAiExplanation(null); setShowExplanation(false);
        const requestUrl = `http://localhost:8080/api/getMoveExplanation`; // Или /api/... если с прокси

        try {
            const response = await fetch(requestUrl, { /* ... fetch options ... */ });
            if (!response.ok) { /* ... error handling ... */ throw new Error(/*...*/); }
            const data = await response.json();
            if (data?.Status === 200 && data?.Body?.llm_response) {
                setAiExplanation(data.Body.llm_response); setShowExplanation(true);
            } else { throw new Error(data?.Body?.ErrorDescription || "..."); }
        } catch (err) { /* ... error handling ... */ setExplanationError(`...`); setShowExplanation(true);
        } finally { setIsFetchingExplanation(false); }
    };

    const closeExplanation = () => { setShowExplanation(false); }

    // --- Рендеринг ---
    if (isLoading) return <div className={styles.loading}>Загрузка игры...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    // Не рендерим плеер, пока SGF не загружен
    if (!sgf) return <div className={styles.loading}>Подготовка SGF...</div>;

    return (
        // Обертка для страницы с отступами
        <div className={`${styles.pageContainer} main-container`}>

            {/* Заголовок и основная информация (React) */}
            <div className={styles.gameHeader}>
                <h2 className={styles.title}>Архивная партия</h2>
                {gameInfo && (
                    <div className={styles.gameDetails}>
                        <p><strong>Игроки:</strong> {gameInfo.BlackPlayer || '?'} vs {gameInfo.WhitePlayer || '?'}</p>
                        <p><strong>Дата:</strong> {gameInfo.Date ? new Date(gameInfo.Date).toLocaleDateString("ru-RU") : '?'}</p>
                        {gameInfo.Event && <p><strong>Событие:</strong> {gameInfo.Event}</p>}
                         {/* Можно добавить больше инфо из gameInfo */}
                    </div>
                )}
            </div>

            {/* Контейнер для WGo плеера */}
            <div className={styles.playerWrapper}>
                 {/* Сам WGo плеер будет рендериться здесь */}
                 {/* Ключ по SGF для пересоздания плеера при смене SGF */}
                <GoPlayerArchive key={sgf} sgf={sgf} onMoveChange={handleMoveChange} />
            </div>

            {/* Блок управления объяснениями (React) */}
            <div className={styles.explanationControls}>
                 {/* Кнопка запроса */}
                 {currentMoveNumber > 0 && (
                     <div className={styles.explainButtonWrapper}>
                         <button
                             onClick={handleGetExplanation}
                             disabled={isFetchingExplanation || !gameInfo } // Блокируем, если нет gameInfo
                             className={styles.explanationButton}
                         >
                             {isFetchingExplanation ? "Запрос ИИ..." : `Объяснить ход #${currentMoveNumber}`}
                         </button>
                     </div>
                 )}
                 {/* Переключатели режима/персонажа */}
                 <div className={styles.modeToggle}>
                     <span className={styles.toggleLabel}>Вид:</span>
                     <button onClick={() => setExplanationMode('dialog')} className={`${styles.toggleButton} ${explanationMode === 'dialog' ? styles.activeToggle : ''}`}>Окно</button>
                     <button onClick={() => setExplanationMode('character')} className={`${styles.toggleButton} ${explanationMode === 'character' ? styles.activeToggle : ''}`}>Персонаж</button>
                 </div>
                 {explanationMode === 'character' && (
                      <div className={styles.characterSelector}>
                           <span className={styles.toggleLabel}>Персонаж:</span>
                           <button onClick={() => setCharacterType('chillGuy')} className={`${styles.toggleButton} ${characterType === 'chillGuy' ? styles.activeToggle : ''}`}>Chill Guy</button>
                           <button onClick={() => setCharacterType('animeGirl')} className={`${styles.toggleButton} ${characterType === 'animeGirl' ? styles.activeToggle : ''}`}>Anime Девушка</button>
                      </div>
                 )}
            </div>


            {/* Отображение объяснения (диалог или персонаж) */}
            {showExplanation && explanationMode === 'dialog' && (
                <div className={styles.explanationDialogOverlay} onClick={closeExplanation}>
                     {/* ... диалоговое окно ... */}
                </div>
            )}
            {showExplanation && explanationMode === 'character' && (
                <AICharacterExplanation /* ... props ... */ />
            )}

        </div>
    );
};

export default ArchiveGame;