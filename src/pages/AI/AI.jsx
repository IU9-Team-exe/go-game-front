import GoPlayer from "../../components/board/GoPlayer.jsx";

function AI() {
    const playerColor = "b";

    return (
        <div>
            <h2 style={{ textAlign: 'center'}}>Игра с KataGo</h2>
            <GoPlayer mode="multiplayer" playerColor={playerColor} />
        </div>
    );
}

export default AI;
