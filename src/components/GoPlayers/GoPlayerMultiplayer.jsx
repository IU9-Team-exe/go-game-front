import React, { useEffect, useRef } from "react";
import { convertCoords } from "../../utils/conversionUtils";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 sgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 playerColor,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            let playerOptions = { width, height, sgf, ...options };
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
                    const currentSgf = player.kifu.toSgf();
                    const message = {
                        sgf: currentSgf,
                        move: [moveColor, moveStr],
                    };

                    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                        socketRef.current.send(JSON.stringify(message));
                    } else {
                        console.warn("WebSocket не установлен");
                    }
                }
            });

            // Инициализация WebSocket
            socketRef.current = new WebSocket("ws://123");
            socketRef.current.onopen = () => {
                console.log("WebSocket соединение установлено");
            };
            socketRef.current.onmessage = (event) => {
                console.log("Сообщение от сервера:", event.data);
                // TODO: обновлять SGF
            };

            playerRef.current = player;

            // Очистка при размонтировании
            return () => {
                if (socketRef.current) {
                    socketRef.current.close();
                }
            };
        }
    }, [width, height, sgf, options, playerColor]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayerMultiplayer;
