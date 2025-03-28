import { useParams } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { useAuth } from "../../contexts/AuthContext";

function Game() {
    const { gameKey } = useParams();
    const { user } = useAuth();
    const playerColor = (user && user.playerColor) || "b";

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer
                playerColor={playerColor}
                gameId={gameKey}
            />
        </div>
    );
}

export default Game;
