import React, { useEffect, useRef } from "react";
import { convertCoords } from "../../utils/conversionUtils";
import { useGame } from "../../contexts/GameContext";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 sgf: initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 playerColor,
                                 gameId,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const socketRef = useRef(null);
    const { sgf, updateSgf } = useGame();

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
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

            // Отслеживание обновлений и отправка хода через WebSocket
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

            const socketUrl = `ws://localhost:8080/api/startGame?game_id=${gameId}`;
            socketRef.current = new WebSocket(socketUrl);
            socketRef.current.onopen = () => {
                console.log("WS-соединение для игры установлено");
            };
            socketRef.current.onmessage = (event) => {
                console.log("WS сообщение:", event.data);
                try {
                    const data = JSON.parse(event.data);
                    if (data.sgf && data.move) {
                        updateSgf(data.sgf);
                        if (player.kifuReader && typeof player.kifuReader.kifu.fromSgf === "function") {
                            player.kifuReader.kifu.fromSgf(data.sgf);
                            player.redraw();
                        }
                    }
                } catch (err) {
                    console.error("Ошибка обработки сообщения WS", err);
                }
            };

            socketRef.current.onerror = (err) => {
                console.error("WebSocket ошибка", err);
            };

            playerRef.current = player;

            return () => {
                if (socketRef.current) {
                    socketRef.current.close();
                }
            };
        }
    }, [width, height, initialSgf, options, playerColor, gameId, sgf, updateSgf]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
