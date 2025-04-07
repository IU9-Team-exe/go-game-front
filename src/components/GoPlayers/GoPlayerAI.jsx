import React, { useEffect, useRef } from "react";
import { callAIMove } from "../../services/API/aiApi";
import { parseCoords, extractMoves } from "../../utils/conversionUtils";

const GoPlayerAI = ({
  width = 800,
  height = 800,
  sgf = "(;FF[4]GM[1]SZ[19])",
  options = {},
}) => {
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

        callAIMove(moves)
          .then((response) => {
            const { bot_move } = response.data;
            if (!bot_move) return;
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

  return (
    <>
      <style>
        {`
          .go-ai-page {
            background-image: url("/ai_background.jpg");
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            padding: 50px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .board-container {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            opacity: 0;
            animation: fadeIn 1.2s ease-in-out forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .go-ai-title {
            font-size: 2rem;
            font-weight: bold;
            color: #fff;
            text-shadow: 1px 1px 4px #000;
            margin-bottom: 30px;
          }
        `}
      </style>

      <div className="go-ai-page">
        <div className="go-ai-title">Игра с KataGo</div>
        <div
          ref={containerRef}
          className="board-container"
          style={{ width, height }}
        />
      </div>
    </>
  );
};

export default GoPlayerAI;
