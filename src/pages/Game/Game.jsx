import {useParams, useNavigate} from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import {GameProvider, useGame} from "../../contexts/GameContext";
import React, {useEffect, useRef, useCallback, useState} from "react";
import styles from "../Game/Game.module.css";
import {analyseCurrent, getGameInfo, leaveGame} from "../../services/API/gameApi.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {fixSgfFormat} from "../../utils/conversionUtils.js";
import AnalysisDialog from "../../components/AnalysisDialog/AnalysisDialog.jsx";

const WS_URL_BASE = import.meta.env.VITE_WS_URL_BASE;

function GameContent() {
    const {gameKey} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();

    const {
        setGameInfo,
        sgf,
        updateSgf,
        updateGameKey,
        playerColor,
        setPlayerColor
    } = useGame();

    const [incomingMove, setIncomingMove] = useState(null);
    const [moveError, setMoveError] = useState(null);
    const unmountedRef = useRef(false);
    const socketRef = useRef(null);
    const [opponentUser, setOpponentUser] = useState(null);

    const [analysis, setAnalysis] = useState(null);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!playerColor) {
            setPlayerColor("b");
        }
    }, [playerColor, setPlayerColor]);

    useEffect(() => {
        const fetchGameInfo = async () => {
            try {
                const response = await getGameInfo(gameKey);
                if (response.data?.Status === 200) {
                    const body = response.data.Body;
                    setGameInfo(body);
                    updateGameKey(body?.game_key)

                    const rawSgf = (body?.sgf || "").trim();
                    const cleaned = fixSgfFormat(rawSgf || "(;FF[4]GM[1]SZ[19])");
                    if (cleaned !== sgf) {
                        updateSgf(cleaned);
                    }
                }
            } catch (error) {
                console.error("Ошибка getGameInfo:", error);
            }
        };

        fetchGameInfo();
    }, [gameKey]);

    const connectSocket = useCallback(() => {
        const socketUrl = `${WS_URL_BASE}?game_id=${gameKey}`;
        let ws;
        try {
            ws = new WebSocket(socketUrl);
        } catch (err) {
            console.error("Ошибка создания WebSocket", err);
            return;
        }
        ws.onopen = () => {
            console.log("WS-соединение установлено");
            socketRef.current = ws;
        };
        ws.onmessage = (event) => {
            console.log("WS сообщение:", event.data);
            try {
                const text = event.data.trim();
                if (!text.startsWith("{")) {
                    console.log("Получено уведомление:", event.data);
                    return;
                }
                const data = JSON.parse(text);

                if (data.move_info) {
                    const info = data.move_info;
                    if (!info.IsMoveCorrect) {
                        setMoveError(info.Error);
                        return;
                    }
                    setMoveError(null);
                    const cleaned = fixSgfFormat(info.NewSgf || "(;FF[4]GM[1]SZ[19])");
                    console.log("sgf form ws after fix:", cleaned)
                    updateSgf(cleaned);
                    setIncomingMove(data);
                    return;
                }

                if (data.event === "opponent_joined" || data.event === "opponent_info") {
                    setOpponentUser(data.user);
                    return;
                }

                if (data.move) {
                    setMoveError(null);
                    setIncomingMove(data);
                }
            } catch (err) {
                console.error("Ошибка обработки WS сообщения", err);
            }
        };
        ws.onerror = (err) => {
            console.error("WS ошибка", err);
        };
        ws.onclose = (event) => {
            console.warn("WS закрыт", event);
            socketRef.current = null;
            if (!unmountedRef.current) {
                setTimeout(connectSocket, 3000);
            }
        };
    }, [gameKey]);

    useEffect(() => {
        connectSocket();
        return () => {
            unmountedRef.current = true;
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectSocket]);

    const sendMove = useCallback(
        (message) => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(message));
            } else {
                console.warn("WS-соединение не установлено для отправки хода");
            }
        },
        []
    );

    const handleLeave = async () => {
        try {
            await leaveGame(gameKey);
        } catch (error) {
            console.error("Ошибка выхода из игры", error);
        } finally {
            setPlayerColor(null)
            updateGameKey(null);
            updateSgf(null);
            navigate("/");
        }
    };

    const handleAnalyse = async () => {
        setIsAnalysing(true);
        try {
            const resp = await analyseCurrent(gameKey);
            const status = resp.data.Status;
            if (status === 200) {
                setAnalysis(resp.data);
                setIsAnalysisOpen(true);
            }
        } catch (error) {
            console.error("Ошибка анализа игры:", error);
        } finally {
            setIsAnalysing(false);
        }
    };

    const opponentNickname = opponentUser?.Username ?? "ожидание";

    return (
        <div>
            <div className={styles.container}>
                <h2>Код игры: {gameKey}</h2>
                <p className={styles.info}>
                    Оппонент: <strong>{opponentNickname}</strong>
                </p>
                <div className={styles.buttonsRow}>
                    <button onClick={handleLeave} className={styles.leaveButton}>
                        Выйти
                    </button>
                    <button
                        onClick={handleAnalyse}
                        disabled={isAnalysing}
                        className={styles.analyseButton}
                    >
                        {isAnalysing ? "Анализ..." : "Анализ игры"}
                    </button>
                </div>
            </div>

            {moveError && <div className={styles.error}>Ошибка хода: {moveError}</div>}
            <GoPlayerMultiplayer onSendMove={sendMove} incomingMove={incomingMove}/>

            {isAnalysisOpen && (
                <AnalysisDialog analysis={analysis} onClose={() => setIsAnalysisOpen(false)}/>
            )}
        </div>
    );
}

export default function Game() {
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    );
}
