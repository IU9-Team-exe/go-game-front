import { useParams, useNavigate } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import React, { useEffect, useRef, useCallback, useState } from "react";
import styles from "../Game/Game.module.css";
import { leaveGame } from "../../services/API/gameApi.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const WS_URL_BASE = "ws://localhost:8080/api/startGame";

function GameContent() {
    const { gameKey } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { playerColor, setPlayerColor } = useGame();

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
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer
                onSendMove={sendMove}
                incomingMove={incomingMove}
            />

            <button onClick={handleLeave} className={styles.leaveButton}>
                Выйти
            </button>
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
