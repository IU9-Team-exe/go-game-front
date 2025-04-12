import React, { useRef, useEffect } from "react";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";

const GoPlayerArchive = ({ sgf = "(;FF[4]GM[1]SZ[19])", options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { width: boardSize, height: boardSize, sgf, ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerArchive;
