import React, {useEffect, useRef} from "react";
import {convertCoords, parseCoords} from "../../utils/conversionUtils";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 sgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 playerColor,
                                 gameId,
                                 playerId,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            let playerOptions = {width, height, sgf, ...options};
            playerOptions.layout = {top: [], bottom: [], left: [], right: []};
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
                        game_id: gameId,
                        player_id: playerId,
                    };

                    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                        socketRef.current.send(JSON.stringify(message));
                    } else {
                        console.warn("WebSocket не установлен");
                    }
                }
            });

            const socketUrl = `ws://localhost:8080/ws/game?game_id=${gameId}&player_id=${playerId}`;
            socketRef.current = new WebSocket(socketUrl);
            socketRef.current.onopen = () => {
                console.log("WebSocket соединение установлено");
            };
            socketRef.current.onmessage = (event) => {
                console.log("Сообщение от сервера:", event.data);
                try {
                    const data = JSON.parse(event.data);
                    if (data.game_id === gameId && data.player_id !== playerId) {
                        const {x, y} = parseCoords(data.coordinates, player.kifu.size);

                        const stoneColor = data.color === "black" ? window.WGo.B : window.WGo.W;


                        if (player.kifuReader && player.kifuReader.kifu && typeof player.kifuReader.kifu.addMove === "function") {
                            player.kifuReader.kifu.addMove({x, y, c: stoneColor});
                            player.redraw();
                        } else {
                            originalPlay.call(editable, x, y);
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
    }, [width, height, sgf, options, playerColor, gameId, playerId]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
