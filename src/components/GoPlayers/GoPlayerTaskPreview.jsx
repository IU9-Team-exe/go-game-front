import React, { useEffect, useRef } from "react";
import "./GoPlayerTaskPreview.css";

const GoPlayerTaskPreview = ({ sgf = "(;FF[4]GM[1]SZ[19])", size = 140 }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const originalPlayRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !window.WGo || !window.WGo.Player) return;

        container.innerHTML = "";

        const player = new window.WGo.BasicPlayer(containerRef.current, {
            width: size,
            height: size,
            sgf,
            enableKeys: false,
            layout: { top: [], bottom: [], left: [], right: [] },
        });

        player.setCoordinates(false);

        return () => {
            container.innerHTML = "";
            playerRef.current = null;
            originalPlayRef.current = null;
        }
    }, [sgf, size]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleWheel = (e) => e.preventDefault();
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", handleWheel, { passive: false });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="go-task-preview"
            style={{ width: size, height: size, flexShrink: 0, overflow: "hidden" }}
        />
    );
};

export default GoPlayerTaskPreview;
