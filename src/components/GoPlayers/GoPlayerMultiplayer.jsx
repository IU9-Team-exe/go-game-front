import React, { useEffect, useRef } from "react";
import { convertCoords, parseCoords } from "../../utils/conversionUtils";
import { useGame } from "../../contexts/GameContext.jsx";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";

const GoPlayerMultiplayer = ({
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
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !window.WGo || !window.WGo.Player) return;

        container.innerHTML = "";

        const playerOptions = {
            width: boardSize,
            height: boardSize,
            sgf: initialSgf,
            ...options,
        };
        playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
        playerOptions.enableKeys = false;

        const player = new window.WGo.BasicPlayer(container, playerOptions);
        player.setCoordinates(true);

        const editable = new window.WGo.Player.Editable(player, player.board);
        editable.set(true);

        playerRef.current = player;
        editableRef.current = editable;

        const originalPlay = editable.play;
        originalPlayRef.current = originalPlay;

        editable.play = function (x, y) {
            const currentTurn =
                this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
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

        setTimeout(() => {
            player.last();
        }, 0);

        return () => {
            if (player.board && editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            container.innerHTML = "";
            playerRef.current = null;
            editableRef.current = null;
            originalPlayRef.current = null;
        };
    }, [initialSgf, boardSize, options, playerColor, onSendMove]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleWheel = (e) => e.preventDefault();
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", handleWheel, { passive: false });
        };
    }, []);

    useEffect(() => {
        if (!incomingMove) return;
        const editable = editableRef.current;
        const originalPlay = originalPlayRef.current;
        if (!editable || !originalPlay) return;

        const { color, coordinates } = incomingMove;
        const size = playerRef.current?.kifu?.size || 19;
        const { x, y } = parseCoords(coordinates, size);
        const wgoColor = color === "black" ? window.WGo.B : window.WGo.W;
        originalPlay.call(editable, x, y, wgoColor);
    }, [incomingMove]);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerMultiplayer;
