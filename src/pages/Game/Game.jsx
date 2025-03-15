import GoPlayer from "../../components/board/GoPlayer.jsx";

function Game() {
    const playerColor = "b";

    return (
        <div>
            <h2 style={{ textAlign: 'center'}}>Тут код</h2>
            <GoPlayer mode="multiplayer" playerColor={playerColor} />
        </div>
    );
}

export default Game;
