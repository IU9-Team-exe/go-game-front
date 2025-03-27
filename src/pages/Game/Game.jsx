
import { useParams } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";

function Game() {
    const { gameKey } = useParams();

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayerMultiplayer mode="multiplayer" playerColor="b" />
        </div>
    );
}

export default Game;
