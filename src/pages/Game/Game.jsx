import { useParams, useNavigate } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import React, { useEffect, useRef, useCallback, useState } from "react";
import styles from "../Game/Game.module.css";
import { getGameInfo, leaveGame } from "../../services/API/gameApi.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {fixSgfFormat} from "../../utils/conversionUtils.js";

const WS_URL_BASE = import.meta.env.VITE_WS_URL_BASE;

function GameContent() {
    const { gameKey } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Достаём из контекста:
    const {
        gameInfo,
        setGameInfo,
        sgf,
        updateSgf,
        playerColor,
        setPlayerColor
    } = useGame();

    const [incomingMove, setIncomingMove] = useState(null);
    const unmountedRef = useRef(false);
    const socketRef = useRef(null);

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
        (async () => {
            try {
                const response = await getGameInfo(gameKey);
                if (response.data?.Status === 200) {
                    const body = response.data.Body;
                    setGameInfo(body);

                    const rawSgf = (body?.sgf || "").trim();
                    const cleanedSgf = fixSgfFormat(rawSgf || "(;FF[4]GM[1]SZ[19])");

                    if (cleanedSgf !== sgf) {
                        updateSgf(cleanedSgf);
                    }
                }
            } catch (error) {
                console.error("Ошибка getGameInfo:", error);
            }
        })();
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
                const trimmed = event.data.trim();
                if (!trimmed.startsWith("{")) {
                    console.log("Получено уведомление:", event.data);
                    return;
                }
                const data = JSON.parse(event.data);

                if (data.move) {
                    setIncomingMove(data.move);
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
                setTimeout(() => {
                    connectSocket();
                }, 3000);
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
            navigate(`/`);
        } catch (error) {
            console.error("Ошибка выхода из игры", error);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <h2>Игра: {gameKey}</h2>
                <button onClick={handleLeave} className={styles.leaveButton}>
                    Выйти
                </button>
            </div>
            <GoPlayerMultiplayer
                onSendMove={sendMove}
                incomingMove={incomingMove}
                initialSgf={sgf}
            />
        </div>


    );
}

function Game() {
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    );
}

export default Game;
