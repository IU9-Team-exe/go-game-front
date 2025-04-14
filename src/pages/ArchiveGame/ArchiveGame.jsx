import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";
// Removed AI API import as fetch is used directly
// import { getAIMoveExplanation } from "../../services/API/aiApi";

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
    const [showExplanationDialog, setShowExplanationDialog] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError(null); // Reset error on new game ID
        setGameInfo(null); // Reset game info
        setSgf("(;FF[4]GM[1]SZ[19])"); // Reset SGF
        setCurrentMoveNumber(0); // Reset move number
        setShowExplanationDialog(false); // Hide dialog

        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    setGameInfo(game);
                    // Ensure SGF is valid or default
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
    }, [gameId]); // Rerun only when gameId changes

    // Callback for WGo player to update the current move number
    const handleMoveChange = (moveNum) => {
        // Check if moveNum is a valid number before setting state
        if (typeof moveNum === 'number' && !isNaN(moveNum)) {
            setCurrentMoveNumber(moveNum);
            // Reset explanation when move changes
            setAiExplanation(null);
            setExplanationError(null);
            setShowExplanationDialog(false);
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
        setShowExplanationDialog(false); // Close previous dialog if open

        // --- Using fetch ---
        // Use relative URL if using Vite proxy, otherwise use absolute URL
        // const requestUrl = `/api/getMoveExplanation`; // For proxy
        const requestUrl = `http://localhost:8080/api/getMoveExplanation`; // Absolute URL

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add credentials header ONLY if your backend requires authentication via cookies
                    // AND is configured for CORS with credentials. Otherwise, remove it.
                    // 'Credentials': 'include'
                },
                body: JSON.stringify({
                    game_archive_id: gameId,
                    move_seq_number: currentMoveNumber
                })
            });

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                 let errorMsg = `HTTP error! status: ${response.status}`;
                 try {
                    // Try to get more specific error from backend response body
                    const errorBody = await response.json();
                    errorMsg = errorBody?.Body?.ErrorDescription || errorMsg;
                 } catch (parseError) {
                    // Ignore if response body isn't valid JSON
                    console.warn("Could not parse error response body:", parseError);
                 }
                 // Special handling for common errors like CORS (though fetch often just throws "Failed to fetch")
                 if (response.status === 0 || response.type === 'opaque' || response.type === 'error') {
                     errorMsg = "Network error or CORS issue. Check console and backend CORS configuration.";
                 }
                 throw new Error(errorMsg);
            }

            // Parse the JSON response body
            const data = await response.json();

            // Check the application-level status in the response body
            if (data?.Status === 200 && data?.Body?.llm_response) {
                setAiExplanation(data.Body.llm_response);
                setShowExplanationDialog(true); // Show dialog on success
            } else {
                 // Throw error based on backend's response structure
                throw new Error(data?.Body?.ErrorDescription || "Не удалось получить объяснение хода от сервера.");
            }
        } catch (err) {
            console.error("Ошибка при запросе объяснения хода:", err);
             // Set a user-friendly error message, incorporating the caught error message
             setExplanationError(`Ошибка: ${err.message || "Не удалось связаться с сервером."}. Проверьте консоль для деталей.`);
            setShowExplanationDialog(true); // Show dialog even on error to display message
        } finally {
            setIsFetchingExplanation(false);
        }
    };


    if (isLoading) {
        return <div className={styles.loading}>Загрузка игры...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    // Prevent rendering player if SGF is invalid or gameInfo is missing
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
                {/* Pass onMoveChange handler and key based on SGF to force re-render if SGF changes drastically */}
                <GoPlayerArchive key={sgf} sgf={sgf} onMoveChange={handleMoveChange} />
            </div>

            {/* Button to request AI explanation */}
            {currentMoveNumber > 0 && ( // Show button only after the first move
                <div className={styles.explanationSection}>
                    <button
                        onClick={handleGetExplanation}
                        disabled={isFetchingExplanation}
                        className={styles.explanationButton}
                    >
                        {isFetchingExplanation ? "Запрос ИИ..." : `Объяснить ход #${currentMoveNumber}`}
                    </button>
                </div>
            )}

            {/* Explanation Dialog */}
            {showExplanationDialog && (
                <div className={styles.explanationDialogOverlay} onClick={() => setShowExplanationDialog(false)}>
                    <div className={styles.explanationDialog} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowExplanationDialog(false)} className={styles.closeButton}>✕</button>
                        <h3>Объяснение хода #{currentMoveNumber} от ИИ</h3>
                        {explanationError && <p className={styles.errorText}>{explanationError}</p>}
                        {aiExplanation && <p className={styles.explanationText}>{aiExplanation}</p>}
                         {!explanationError && !aiExplanation && <p>Загрузка...</p>} {/* Optional loading state inside dialog */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchiveGame;