import React, { useEffect, useRef, useCallback } from "react";
import { convertCoords } from "../../utils/conversionUtils";
import { useGame } from "../../contexts/GameContext";

const WS_URL_BASE = "ws://localhost:8080/api/startGame";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 sgf: initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 gameId,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const { sgf, updateSgf, playerColor } = useGame();

    const connectSocket = useCallback(() => {
        const socketUrl = `${WS_URL_BASE}?game_id=${gameId}`;
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
                    if (
                        playerRef.current &&
                        playerRef.current.kifuReader &&
                        typeof playerRef.current.kifuReader.kifu.fromSgf === "function"
                    ) {
                        playerRef.current.kifuReader.kifu.fromSgf(data.sgf);
                        playerRef.current.redraw();
                    }
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
    }, [gameId, updateSgf]);

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

    useEffect(() => {
        if (window.WGo && window.WGo.Player && containerRef.current) {
            const currentSgf = sgf || initialSgf;
            let playerOptions = { width, height, sgf: currentSgf, ...options };
            playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);

            const originalPlay = editable.play;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== playerColor) {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);

            player.addEventListener("update", (e) => {
                if (e.change && e.change.add && e.change.add.length > 0) {
                    const move = e.change.add[0];
                    const moveColor = move.c === window.WGo.B ? "b" : "w";
                    if (moveColor !== playerColor) {
                        console.warn("Ход не разрешен: не ваша очередь.");
                        return;
                    }
                    const moveStr = convertCoords(move.x, move.y, player.kifu.size);

                    const message = {
                        color: moveColor === "b" ? "black" : "white",
                        coordinates: moveStr,
                    };

                    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                        socketRef.current.send(JSON.stringify(message));
                    } else {
                        console.warn("WebSocket не установлен");
                    }
                }
            });

            playerRef.current = player;
        }
    }, [width, height, initialSgf, options, playerColor, sgf]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
