import React, { useEffect, useRef } from "react";
import { callAIMove } from "../../services/API/aiApi";
import { parseCoords, extractMoves } from "../../utils/conversionUtils";

const GoPlayerAI = ({ width = 800, height = 800, sgf = "(;FF[4]GM[1]SZ[19])", options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            let playerOptions = { width, height, sgf, ...options };
            playerOptions.layout = { top: [], bottom: [], left: [], right: [] };
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);

            // Переопределяем play для интеграции хода ИИ
            const originalPlay = editable.play;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== "b") {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);

                const currentSgf = player.kifuReader.kifu.toSgf();
                const moves = extractMoves(currentSgf, player.kifu.size);
                console.log(moves);

                callAIMove(moves)
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

            playerRef.current = player;
        }
    }, [width, height, sgf, options]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayerAI;
