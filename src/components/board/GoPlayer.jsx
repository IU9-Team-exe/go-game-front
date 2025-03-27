import React, { useEffect, useRef } from "react";
import {callAIMove} from "../../services/API/aiApi";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const convertCoords = (x, y, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = letters[x] || "";
    const number = boardSize - y;
    return letter + number;
};

const parseCoords = (moveStr, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = moveStr[0];
    const num = parseInt(moveStr.slice(1), 10);
    const x = letters.indexOf(letter);
    const y = boardSize - num;
    return { x, y };
};

const extractMoves = (sgf, boardSize) => {
    const moves = [];
    const regex = /;([BW])\[([a-z]{2})\]/gi;
    let match;
    while ((match = regex.exec(sgf)) !== null) {
        const colorChar = match[1];
        const coord = match[2];

        const x = coord.charCodeAt(0) - "a".charCodeAt(0);
        const y = coord.charCodeAt(1) - "a".charCodeAt(0);

        const coordinates = convertCoords(x, y, boardSize);

        const color = colorChar.toLowerCase();

        moves.push({
            color,
            coordinates,
        });
    }
    return moves;
};

const GoPlayer = ({
                      width = 800,
                      height = 800,
                      sgf = defaultSgf,
                      options = {},
                      mode = "offline",
                      playerColor
                  }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            let playerOptions = {
                width,
                height,
                sgf,
                ...options,
            };

            if (mode === "multiplayer" || mode === "ai") {
                playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
                playerOptions.enableKeys = false;
            }

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);

            player.addEventListener("update", (e) => {
                if (e.change && e.change.add && e.change.add.length > 0) {
                    console.log("Current SGF:", player.kifuReader.kifu.toSgf());
                }
            });

            if (mode === "multiplayer") {
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

                socketRef.current = new WebSocket("ws://123");
                socketRef.current.onopen = () => {
                    console.log("WebSocket соединение установлено");
                };
                socketRef.current.onmessage = (event) => {
                    console.log("Сообщение от сервера:", event.data);
                    // TODO: обновлять SGF
                };

                return () => {
                    if (socketRef.current) {
                        socketRef.current.close();
                    }
                };
            }
            else if (mode === "ai") {
                const originalPlay = editable.play;
                editable.play = function (x, y) {
                    const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                    if (currentTurn !== "b") {
                        console.warn("Ход не разрешен: не ваша очередь.");
                        return;
                    }
                    originalPlay.call(this, x, y);
                    const currentSgf = player.kifuReader.kifu.toSgf();
                    const moves = extractMoves(currentSgf, 19);

                    const payload = {
                        moves,
                    };
                    console.log(payload);

                    callAIMove(payload)
                        .then((response) => {
                            const { bot_move } = response.data;
                            if (!bot_move) {
                                console.error("Сервер не вернул bot_move");
                                return;
                            }
                            const { x: botX, y: botY } = parseCoords(bot_move.coordinates, player.kifu.size);

                            originalPlay.call(this, botX, botY);
                        })
                        .catch((err) => {
                            console.error("Ошибка получения хода от ИИ:", err);
                        });
                };

                if (editable._ev_click) {
                    player.board.removeEventListener("click", editable._ev_click);
                }
                editable._ev_click = editable.play.bind(editable);
                player.board.addEventListener("click", editable._ev_click);
            }

            playerRef.current = player;
        }
    }, [width, height, sgf, options, mode, playerColor]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayer;
