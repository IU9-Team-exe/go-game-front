import GoPlayer from "../../components/board/GoPlayer.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Game() {
    const { gameKey } = useParams();
    const game = useSelector((state) => state.game.currentGame);

    if (!game) {
        return <div>Игра не найдена. Пожалуйста, создайте или подключитесь к игре.</div>;
    }
    console.log(game);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Игра: {gameKey}</h2>
            <GoPlayer mode="multiplayer" playerColor="b" />
        </div>
    );
}

export default Game;
