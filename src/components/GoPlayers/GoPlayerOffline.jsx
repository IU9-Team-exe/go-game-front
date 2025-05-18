import React, { useEffect, useRef } from "react";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize.js";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayerOffline = ({ sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(1);
    const layoutInfo = {
        top:    ["Control"],
    };

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = {
                width: boardSize,
                height: boardSize,
                layout: layoutInfo,
                sgf,
                ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    useEffect(() => {
        const handleWheel = (e) => e.preventDefault();
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel, { passive: false });
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerOffline;
