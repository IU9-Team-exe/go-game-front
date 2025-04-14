import React, { useRef, useEffect } from "react";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";

const GoPlayerArchive = ({ sgf = "(;FF[4]GM[1]SZ[19])", options = {}, onMoveChange }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const onMoveChangeRef = useRef(onMoveChange); // Ref to keep track of the latest callback
    const boardSize = useResponsiveBoardSize(20);

    // Update the ref whenever the callback changes
    useEffect(() => {
        onMoveChangeRef.current = onMoveChange;
    }, [onMoveChange]);

    // Effect for initializing and cleaning up the WGo player
    useEffect(() => {
        let player = null; // Local variable for the player instance in this effect run
        let updateListener = null; // Local variable for the listener

        // Ensure WGo is loaded and container exists
        if (window.WGo && window.WGo.Player && containerRef.current) {
            // --- Initialization ---
            containerRef.current.innerHTML = ''; // Clear previous instance visually

            const playerOptions = { width: boardSize, height: boardSize, sgf, ...options };
            player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);

            // Listener for move updates
            updateListener = (e) => {
                if (e.path && onMoveChangeRef.current) {
                    // Pass the current move number (e.path.m) to the callback
                    onMoveChangeRef.current(e.path.m);
                }
            };

            player.addEventListener('update', updateListener);
            playerRef.current = player; // Store ref if needed elsewhere, but manage lifecycle locally

            // Trigger initial move update if needed (e.g., starting at move 0)
             if (onMoveChangeRef.current) {
                  const initialPath = player.kifuReader?.path || { m: 0 };
                  onMoveChangeRef.current(initialPath.m);
             }

        }

        // --- Cleanup Function ---
        // This runs when the component unmounts or when dependencies [boardSize, sgf] change
        return () => {
            if (player && updateListener) { // Use local player/listener variables for cleanup
                try {
                    player.removeEventListener('update', updateListener);
                } catch (e) {
                    console.warn("Error removing WGo listener:", e);
                }
            }
             // Clear the container DOM
             if (containerRef.current) {
                 containerRef.current.innerHTML = '';
             }
             playerRef.current = null; // Clear the stored ref
        };
    // Only re-run the effect if sgf or boardSize changes.
    // Assuming `options` is static for the archive player.
    }, [boardSize, sgf]);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerArchive;