import React, { useRef, useEffect } from "react";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";

const GoPlayerArchive = ({ sgf = "(;FF[4]GM[1]SZ[19])", options = {}, onUpdate }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    // Store onUpdate in a ref to avoid re-triggering useEffect unnecessarily
    const onUpdateRef = useRef(onUpdate);
    useEffect(() => {
        onUpdateRef.current = onUpdate;
    }, [onUpdate]);

    useEffect(() => {
        let player = null;
        let updateListener = null;

        if (window.WGo && window.WGo.Player && containerRef.current) {
            // Clear previous player instance before creating a new one
            containerRef.current.innerHTML = '';

            const playerOptions = { width: boardSize, height: boardSize, sgf, ...options };
            player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            playerRef.current = player; // Store reference if needed elsewhere

            // Attach update listener if callback is provided
            if (onUpdateRef.current) {
                updateListener = (e) => {
                    // Ensure kifuReader and node exist
                    if (!player.kifuReader || !player.kifuReader.node) return;

                    const node = e.node || player.kifuReader.node; // Get current node
                    const moveNumber = node && node.move ? node.depth : 0; // Depth corresponds to move sequence number (root is 0)

                    // Check if the listener ref still holds the function
                    if (onUpdateRef.current) {
                        onUpdateRef.current(moveNumber, node);
                    }
                };
                player.addEventListener("update", updateListener);

                // Initial update call to set the starting move number (usually 0)
                setTimeout(() => {
                    if (player.kifuReader && player.kifuReader.node && onUpdateRef.current) {
                         onUpdateRef.current(0, player.kifuReader.node);
                    }
                }, 0);
            }
        }

        // Cleanup function
        return () => {
            if (player && updateListener) {
                player.removeEventListener("update", updateListener);
            }
            // Optional: Destroy player instance if WGo provides a method
            // if (player && player.destroy) {
            //     player.destroy();
            // }
            if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Clear container on unmount/re-render
            }
            playerRef.current = null;
        };
    }, [boardSize, sgf, options]); // Re-run effect if size, sgf, or options change

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerArchive;