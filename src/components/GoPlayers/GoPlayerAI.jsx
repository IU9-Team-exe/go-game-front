import React, {useEffect, useRef, useState} from "react";
import {newBotGame, generateMove} from "../../services/API/aiApi";
import {convertCoords} from "../../utils/conversionUtils";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize.js";

const GoPlayerAI = ({options = {}}) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const editableRef = useRef(null);
    const originalPlayRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    const [sgfState, setSgfState] = useState("(;FF[4]GM[1]SZ[19])");

    useEffect(() => {
        newBotGame()
            .then((resp) => {
                if (resp.data.Status === 200 && resp.data.Body.sgf) {
                    setSgfState(resp.data.Body.sgf);
                }
            })
            .catch((err) => console.error("Ошибка создания игры с ботом:", err));
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !window.WGo || !window.WGo.Player) return;

        container.innerHTML = "";

        const playerOptions = {
            width: boardSize,
            height: boardSize,
            sgf: sgfState,
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

        const originalPlay = editable.play;
        originalPlayRef.current = originalPlay;

        editable.play = function (x, y) {
            const currentTurn =
                this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
            if (currentTurn !== "b") {
                console.warn("Ход не разрешён: не ваша очередь.");
                return;
            }
            originalPlay.call(this, x, y);

            const move = {
                color: "B",
                coordinates: convertCoords(x, y, player.kifu.size),
            };

            generateMove(move)
                .then((resp) => {
                    if (resp.data.Status === 200 && resp.data.Body.sgf) {
                        setSgfState(resp.data.Body.sgf);
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
    }, [sgfState, boardSize, options]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const block = (e) => e.preventDefault();
        container.addEventListener("wheel", block, {passive: false});
        return () => container.removeEventListener("wheel", block);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{width: boardSize, height: boardSize, overflow: "hidden"}}
        />
    );
};

export default GoPlayerAI;
