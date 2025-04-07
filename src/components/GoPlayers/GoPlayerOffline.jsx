import React, { useEffect, useRef } from "react";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayerOffline = ({ width = 800, height = 800, sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { width, height, sgf, ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
        }
    }, [width, height, sgf, options]);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayerOffline;
