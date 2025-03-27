import { useParams, useLocation } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";

function Game() {
    const { gameKey } = useParams();
    const location = useLocation();
    const state = location.state || {};
    const playerColor = state.playerColor || "b";
    const playerId = state.playerId || "player";

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer
                playerColor={playerColor}
                gameId={gameKey}
                playerId={playerId}
            />
        </div>
    );
}

export default Game;
