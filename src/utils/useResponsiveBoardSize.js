import {useState, useEffect} from "react";

export function useResponsiveBoardSize(margin = 20) {
    const [boardSize, setBoardSize] = useState(
        Math.min(window.innerWidth, window.innerHeight) - margin
    );

    useEffect(() => {
        const updateSize = () => {
            const newSize = Math.min(window.innerWidth * 0.75, window.innerHeight * 0.75) - margin;
            setBoardSize(newSize);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [margin]);

    return boardSize;
}
