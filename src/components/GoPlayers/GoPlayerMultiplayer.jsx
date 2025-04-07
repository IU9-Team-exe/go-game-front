import React, { useEffect, useRef } from "react";
import { convertCoords, parseCoords } from "../../utils/conversionUtils";
import {useGame} from "../../contexts/GameContext.jsx";

const GoPlayerMultiplayer = ({
                                 width = 800,
                                 height = 800,
                                 initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 onSendMove,
                                 incomingMove,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const editableRef = useRef(null);
    const originalPlayRef = useRef(null);
    const { playerColor } = useGame();

    useEffect(() => {
        if (window.WGo && window.WGo.Player && containerRef.current) {
            // Создаём плеер только при первом рендере
            let playerOptions = {
                width,
                height,
                sgf: initialSgf,
                ...options,
            };
            playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
            editableRef.current = editable;
            const originalPlay = editable.play;
            originalPlayRef.current = originalPlay;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== playerColor) {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);
                const moveStr = convertCoords(x, y, player.kifu.size);
                const message = {
                    color: playerColor === "b" ? "black" : "white",
                    coordinates: moveStr,
                };
                onSendMove?.(message);
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!incomingMove) return;
        if (!editableRef.current || !originalPlayRef.current) return;

        const { color, coordinates } = incomingMove;
        const size = playerRef.current?.kifu?.size || 19;
        const { x, y } = parseCoords(coordinates, size);
        const wgoColor = color === "black" ? window.WGo.B : window.WGo.W;
        originalPlayRef.current.call(editableRef.current, x, y, wgoColor);
    }, [incomingMove]);

    return <div ref={containerRef} style={{width, height}}/>;
};

export default GoPlayerMultiplayer;
