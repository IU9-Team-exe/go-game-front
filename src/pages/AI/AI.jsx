import GoPlayerAI from "../../components/GoPlayers/GoPlayerAI.jsx";

function AI() {
    const playerColor = "b";

    return (
        <div>
            <h2 style={{ textAlign: 'center'}}>Игра с KataGo</h2>
            <GoPlayerAI mode="ai" playerColor={playerColor} />
        </div>
    );
}

export default AI;
