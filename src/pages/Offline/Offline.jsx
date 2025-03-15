// import React, {useEffect} from "react";
// import {useParams} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {getGameById} from "../../services/gameService";
import GoPlayer from "../../components/board/GoPlayer.jsx";

function Offline() {
    // const {gameId} = useParams();
    // const user = useSelector((state) => state.user.user);

    // useEffect(() => {
    //
    //     if (gameId) {
    //         getGameById(gameId)
    //             .then((res) => {
    //                 console.log("Game data:", res.data);
    //             })
    //             .catch((err) => {
    //                 console.error("Error fetching game:", err);
    //             });
    //     }
    // }, [gameId]);

    return (

        <div>
            <GoPlayer width={865} height={865} options={{}}/>
        </div>
    );
}

export default Offline;
