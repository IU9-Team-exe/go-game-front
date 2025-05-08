import React, {useEffect, useRef} from "react";
import {generateMove} from "../../services/API/aiApi";
import {convertCoords} from "../../utils/conversionUtils";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize";
import {useGame} from "../../contexts/GameContext";

const GoPlayerAI = ({options = {}}) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const editableRef = useRef(null);
    const originalPlayRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    const {sgf, updateSgf, playerColor} = useGame();

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !window.WGo || !window.WGo.Player) return;

        container.innerHTML = "";

        const playerOptions = {
            width: boardSize,
            height: boardSize,
            sgf,
            ...options,
        };
        playerOptions.layout = {top: [], bottom: [], left: [], right: []};
        playerOptions.enableKeys = false;

        const player = new window.WGo.BasicPlayer(container, playerOptions);
        player.setCoordinates(true);

        const editable = new window.WGo.Player.Editable(player, player.board);
        editable.set(true);

        playerRef.current = player;
        editableRef.current = editable;
        originalPlayRef.current = editable.play;

        editable.play = function (x, y) {
            const currentTurn =
                this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
            if (currentTurn !== playerColor) return;

            originalPlayRef.current.call(this, x, y);
            const coord = convertCoords(x, y, player.kifu.size);
            generateMove({color: playerColor === "b" ? "B" : "W", coordinates: coord})
                .then((resp) => {
                    if (resp.data.Status === 200 && resp.data.Body.sgf) {
                        updateSgf(resp.data.Body.sgf);
                    } else {
                        console.error("Неверный ответ от /generateMove:", resp.data);
                    }
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

        const blockWheel = (e) => e.preventDefault();
        container.addEventListener("wheel", blockWheel, {passive: false});

        setTimeout(() => player.last(), 0);

        // Cleanup
        return () => {
            if (player.board && editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            container.removeEventListener("wheel", blockWheel);
            container.innerHTML = "";
            playerRef.current = null;
            editableRef.current = null;
            originalPlayRef.current = null;
        };
    }, [sgf, boardSize, options, playerColor, updateSgf]);

    return (
        <div
            ref={containerRef}
            style={{width: boardSize, height: boardSize, overflow: "hidden"}}
        />
    );
};

export default GoPlayerAI;
