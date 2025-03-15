import React, { useEffect, useRef } from "react";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const convertCoords = (x, y, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = letters[x] || "";
    const number = boardSize - y;
    return letter + number;
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

            if (mode === "multiplayer") {
                playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
                playerOptions.enableKeys = false;
            }

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);

            if (mode === "multiplayer") {
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
            } else {
                const editable = new window.WGo.Player.Editable(player, player.board);
                editable.set(true);
            }

            playerRef.current = player;
        }
    }, [width, height, sgf, options, mode, playerColor]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayer;
