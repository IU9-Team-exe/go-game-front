import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import { getMoveExplanation } from "../../services/API/aiApi";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive";
import Modal from "../../components/Modal/Modal"; // Import the Modal component
import styles from "./AnalyzeGame.module.css";
import { useAuth } from "../../contexts/AuthContext";

const MAX_REQUESTS_PER_SESSION = 5; // Quota limit per game analysis session

const AnalyzeGamePage = () => {
    const { gameId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");
    const [currentMoveNumber, setCurrentMoveNumber] = useState(0);
    const [aiExplanation, setAiExplanation] = useState("");
    const [error, setError] = useState(null);
    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [requestCount, setRequestCount] = useState(0);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Check auth
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Load quota from session storage or initialize
    useEffect(() => {
        const savedCount = sessionStorage.getItem(`analyzeQuota_${gameId}`);
        const initialCount = savedCount ? parseInt(savedCount, 10) : 0;
        setRequestCount(initialCount);
        if (initialCount >= MAX_REQUESTS_PER_SESSION) {
            setQuotaExceeded(true);
            setError(`Достигнут лимит (${MAX_REQUESTS_PER_SESSION}) запросов на анализ для этой сессии.`);
        }
    }, [gameId]);

    // Fetch game data
    useEffect(() => {
        setIsLoadingGame(true);
        setError(null); // Clear previous errors
        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    if (!game || !game.Sgf) {
                        setError("Не удалось загрузить SGF для анализа.");
                        setGameInfo(game); // Set info even if SGF is missing initially
                        setSgf("(;FF[4]GM[1]SZ[19])") // Default SGF
                    } else {
                         setGameInfo(game);
                         // Basic SGF cleaning might be needed depending on source
                         setSgf(game.Sgf.trim() || "(;FF[4]GM[1]SZ[19])");
                    }
                } else {
                     setError(`Ошибка при получении данных игры: ${response.data.Body?.ErrorDescription || response.data.Status}`);
                }
            })
            .catch((err) => {
                console.error("Fetch game error:", err);
                setError(`Не удалось загрузить информацию об игре. ${err.message || ''}`);
            })
            .finally(() => {
                setIsLoadingGame(false);
            });
    }, [gameId]);

    // Callback for GoPlayerArchive update
    const handlePlayerUpdate = useCallback((moveNumber, node) => {
        setCurrentMoveNumber(moveNumber);
        // Don't clear explanation automatically, let the user see it until next analysis
        // setAiExplanation(""); // Reset explanation when move changes? Maybe not needed.
        // Clear only API errors on move change, not quota error
        if (error && !quotaExceeded) {
            setError(null);
        }
    }, [error, quotaExceeded]);

    // Handle request for AI explanation
    const handleAnalyzeMove = async () => {
        // Check if analysis is possible
        if (quotaExceeded || currentMoveNumber <= 0 || isLoadingExplanation) {
             if (currentMoveNumber <= 0) setError("Выберите ход для анализа (не начальную позицию).");
             return;
        }

        setIsLoadingExplanation(true);
        setError(null);
        setAiExplanation(""); // Clear previous explanation

        try {
            const response = await getMoveExplanation(gameId, currentMoveNumber);

            if (response.data.Status === 200) {
                const explanation = response.data.Body?.llm_response || "ИИ не дал комментарий к этому ходу.";
                setAiExplanation(explanation);
                setIsModalOpen(true); // Open the modal with the explanation

                const newCount = requestCount + 1;
                setRequestCount(newCount);
                sessionStorage.setItem(`analyzeQuota_${gameId}`, newCount.toString());

                if (newCount >= MAX_REQUESTS_PER_SESSION) {
                    setQuotaExceeded(true);
                     // Set error message after successful request that hits the limit
                    setError(`Достигнут лимит (${MAX_REQUESTS_PER_SESSION}) запросов на анализ для этой сессии.`);
                }

            } else {
                setError(`Ошибка анализа: ${response.data.Body?.ErrorDescription || response.data.Status}`);
            }
        } catch (err) {
            console.error("Analyze move error:", err);
            setError(`Не удалось получить объяснение хода от ИИ. ${err.message || ''}`);
        } finally {
            setIsLoadingExplanation(false);
        }
    };

    // Close Modal handler
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Render Loading State
    if (isLoadingGame) {
        return <div className={`${styles.container} main-container`}><div className={styles.message}>Загрузка игры...</div></div>;
    }

    // Render Error State (if game loading failed significantly)
    if (!gameInfo && error) {
         return <div className={`${styles.container} main-container`}><div className={styles.error}>{error}</div></div>;
    }

    // Render Main Content
    return (
        <div className={`${styles.container} main-container`}>
            <h2 className={styles.title}>Анализ партии с ИИ</h2>
            {gameInfo && (
                <p className={styles.gameInfo}>
                    {gameInfo.BlackPlayer || '?'} ({gameInfo.BlackRank || '?'}) vs {gameInfo.WhitePlayer || '?'} ({gameInfo.WhiteRank || '?'})
                    {' - '}
                    {gameInfo.Date ? new Date(gameInfo.Date).toLocaleDateString("ru-RU") : 'N/A'}
                    {gameInfo.Event ? ` [${gameInfo.Event}]` : ''}
                </p>
            )}

            {/* Display SGF load error specifically */}
            {sgf === "(;FF[4]GM[1]SZ[19])" && !isLoadingGame && gameInfo && !error && (
                 <div className={styles.error}>Не удалось загрузить SGF для этой игры. Анализ недоступен.</div>
            )}

            {/* Only render player if SGF is likely loaded */}
            {sgf !== "(;FF[4]GM[1]SZ[19])" && (
                <>
                    <div className={styles.playerContainer}>
                        <GoPlayerArchive sgf={sgf} onUpdate={handlePlayerUpdate} />
                    </div>

                    <div className={styles.analysisControls}>
                        <span>Ход: {currentMoveNumber}</span>
                        <button
                            onClick={handleAnalyzeMove}
                            disabled={isLoadingExplanation || quotaExceeded || currentMoveNumber <= 0}
                            className={styles.analyzeButton}
                            title={currentMoveNumber <= 0 ? "Выберите ход (кроме начальной позиции)" : quotaExceeded ? "Лимит запросов исчерпан" : "Получить комментарий ИИ"}
                        >
                            {isLoadingExplanation ? "Анализ..." : "Что думает ИИ?"}
                        </button>
                        <span className={styles.quota}>
                            Запросов: {requestCount} / {MAX_REQUESTS_PER_SESSION}
                        </span>
                    </div>
                 </>
            )}

            {/* Display general errors (API errors, quota message) */}
            {error && <div className={styles.error}>{error}</div>}

            {/* Render the Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>{aiExplanation}</p>
            </Modal>
        </div>
    );
};

export default AnalyzeGamePage;