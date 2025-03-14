import React, { useEffect, useRef } from "react";

// Определяем минимальный SGF для пустой доски 19x19
const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayer = ({ width = 800, height = 800, sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = {
                width,
                height,
                sgf,
                ...options,
            };

            playerRef.current = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
        }
    }, [width, height, sgf, options]);
    console.log(containerRef);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default GoPlayer;
