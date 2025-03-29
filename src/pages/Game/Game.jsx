import { useParams } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import { useEffect, useRef, useCallback } from "react";

const WS_URL_BASE = "ws://localhost:8080/api/startGame";

function GameContent() {
    const { gameKey } = useParams();
    const { playerColor, setPlayerColor, updateSgf } = useGame();
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

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
                if (data.sgf && data.move) {
                    updateSgf(data.sgf);
                }
            } catch (err) {
                console.error("Ошибка обработки WS сообщения", err);
            }
        };
        ws.onerror = (err) => {
            console.error("WS ошибка", err);
        };
        ws.onclose = (event) => {
            console.warn("WS-соединение закрыто", event);
            socketRef.current = null;
            reconnectTimeoutRef.current = setTimeout(() => {
                console.log("Попытка переподключения WS...");
                connectSocket();
            }, 3000);
        };
    }, [gameKey, updateSgf]);

    useEffect(() => {
        if (!playerColor) {
            setPlayerColor("b");
        }
    }, [playerColor, setPlayerColor]);

    useEffect(() => {
        connectSocket();
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectSocket]);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer gameId={gameKey} />
        </div>
    );
}

function Game() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

export default Game;
