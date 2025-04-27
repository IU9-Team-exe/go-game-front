import React, {useEffect, useRef} from "react";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize";

const GoPlayerTask = ({sgf, options = {}}) => {
    const containerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (!window.WGo || !window.WGo.Player || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        const playerOptions = {
            width: boardSize,
            height: boardSize,
            sgf,
            enableKeys: false,
            ...options,
        };

        const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
        player.setCoordinates(true);

        const editable = new window.WGo.Player.Editable(player, player.board);
        editable.set(true);

    }, [boardSize, sgf, options]);

    useEffect(() => {
        const handler = (e) => e.preventDefault();
        const el = containerRef.current;
        if (el) el.addEventListener("wheel", handler, {passive: false});
        return () => {
            if (el) el.removeEventListener("wheel", handler, {passive: false});
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{width: boardSize, height: boardSize, overflow: "hidden"}}
        />
    );
};

export default GoPlayerTask;
