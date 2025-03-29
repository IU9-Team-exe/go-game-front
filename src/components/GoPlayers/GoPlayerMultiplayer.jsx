import React, { useEffect, useRef } from "react";
import { convertCoords } from "../../utils/conversionUtils";
import { useGame } from "../../contexts/GameContext";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 sgf: initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 onSendMove,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const { sgf, playerColor } = useGame();

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
                    if (onSendMove) {
                        onSendMove(message);
                    }
                }
            });

            playerRef.current = player;
        }
    }, [width, height, initialSgf, options, playerColor, sgf, onSendMove]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
