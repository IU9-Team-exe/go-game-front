import { useParams } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import { useEffect } from "react";

function GameContent() {
    const { gameKey } = useParams();
    const { playerColor, setPlayerColor } = useGame();

    useEffect(() => {
        if (!playerColor) {
            setPlayerColor("b");
        }
    }, [playerColor, setPlayerColor]);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer playerColor={playerColor} gameId={gameKey} />
        </div>
    );
}

function Game() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

export default Game;
